import { Workbook } from 'exceljs'
import { saveAs } from 'file-saver'
import { formatTimeFromDateTime } from 'src/configs/helper'
import { getCurrentDate, getDayOfDate } from 'src/helpers'
import { getEmployeeData } from 'src/libs/modules/hrm/employees'

export function ExportAttendanceToXLSX(data, companyName) {
  let storage = localStorage.getItem('sharedData')
  storage = JSON.parse(storage)

  const exportToExcel = async () => {
    try {
      const employeeData = await getEmployeeData(storage.employeeId)

      const flattenedData = data.map(_ => ({
        date: _.date,
        day: getDayOfDate(_.date),
        clockIn: _.data?.clockIn ? formatTimeFromDateTime(_.data?.clockIn) : '-',
        clockOut: _.data?.clockOut ? formatTimeFromDateTime(_.data?.clockOut) : '-',
        workHours: _.data?.workHours ? `${_.data.workHour}h ${_.data.workMinute}m` : '-',
        late: _.data?.late ? _.data?.late : '-',
        breakIn: _.data?.breakIn ? formatTimeFromDateTime(_.data?.breakIn) : '-',
        breakOut: _.data?.breakOut ? formatTimeFromDateTime(_.data?.breakOut) : '-',
        breakHours: _.data?.breakHours ? `${_.data.breakHour}h ${_.data.breakMinute}m` : '-'
      }))

      const workbook = new Workbook()
      const worksheet = workbook.addWorksheet('Attendance Report')

      /* Add Company Name and Exported Date headers */
      worksheet.addRow(['Employee Name', employeeData.name]).font = { bold: true }
      worksheet.addRow(['HR Code', employeeData.hrcode]).font = { bold: true }
      worksheet.addRow(['Exported Date', getCurrentDate('exporting')]).font = { bold: true }

      /* Add a blank row for spacing */
      worksheet.addRow([])

      /* Add headers for _ data */
      const headers = [
        'Date',
        'Day',
        'Clock In',
        'Clock Out',
        'Work Hours',
        'Late',
        'Break In',
        'Break Out',
        'Break Hours'
      ]
      worksheet.addRow(headers)

      /* Add data to the worksheet */
      flattenedData.forEach(_ => {
        const rowData = [_.date, _.day, _.clockIn, _.clockOut, _.workHours, _.late, _.breakIn, _.breakOut, _.breakHours]
        const row = worksheet.addRow(rowData)

        row.eachCell(cell => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          }
        })
      })

      /* Apply style to headers */
      const headerRow = worksheet.getRow(5)
      headerRow.eachCell(cell => {
        cell.font = { bold: true }
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      })

      /* Auto-fit columns */
      worksheet.columns.forEach((column, index) => {
        let maxLength = 0
        worksheet.getColumn(index + 1).eachCell({ includeEmpty: true }, cell => {
          if (cell.value) {
            const cellLength = cell.value.toString().length
            maxLength = Math.max(maxLength, cellLength)
          }
        })
        column.width = maxLength < 12 ? 12 : maxLength
      })

      /* Save the workbook */
      const buffer = await workbook.xlsx.writeBuffer()
      saveAs(new Blob([buffer]), `Attendance_Report_${employeeData.name}_${getCurrentDate('exporting')}.xlsx`)
    } catch (error) {
      console.error('Error exporting Attendance to Excel:', error)
    }
  }

  return exportToExcel()
}
