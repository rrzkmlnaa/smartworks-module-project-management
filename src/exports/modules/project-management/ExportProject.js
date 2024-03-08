import { Workbook } from 'exceljs'
import { saveAs } from 'file-saver'
import { getCurrentDate } from 'src/helpers'

export function ExportProjectsToXLSX(data) {
  const exportToExcel = async () => {
    try {
      const flattenedData = data.map(_ => ({
        name: _.name,
        status: _.status,
        startDate: _.dueDate,
        endDate: _.dueDate,
        progress: _.progress ? `${_.progress}%` : '0%'
      }))

      const workbook = new Workbook()
      const worksheet = workbook.addWorksheet('Project Report')

      /* Add Company Name and Exported Date headers */
      worksheet.addRow(['Company Name', 'HR Academy']).font = { bold: true }
      worksheet.addRow(['Exported Date', getCurrentDate('exporting')]).font = { bold: true }

      /* Add a blank row for spacing */
      worksheet.addRow([])

      /* Add headers for employee data */
      const headers = ['Name', 'Status', 'Start Date', 'End Date', 'Progress']
      worksheet.addRow(headers)

      /* Add data to the worksheet */
      flattenedData.forEach(_ => {
        const rowData = [_.name, _.status, _.startDate, _.endDate, _.progress]
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
      const headerRow = worksheet.getRow(4)
      headerRow.eachCell(cell => {
        cell.font = { bold: true }
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFF00' }
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
      saveAs(new Blob([buffer]), `Project_Report_${getCurrentDate('exporting')}.xlsx`)
    } catch (error) {
      console.error('Error exporting projects to Excel:', error)
    }
  }

  return exportToExcel()
}
