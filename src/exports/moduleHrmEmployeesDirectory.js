import { Workbook } from 'exceljs'
import { saveAs } from 'file-saver'
import { getCurrentDate } from 'src/helpers'

export function ExportEmployeesToXLSX(data, companyName) {
  const exportToExcel = async () => {
    try {
      const flattenedData = data.map(employee => ({
        name: employee.name,
        hrcode: employee.hrcode,
        email: employee.email,
        status: employee.status,
        department: employee.departments.map(dep => dep.department.name).join(', '),
        position: employee.positions.map(pos => pos.position.name).join(', ')
      }))

      const workbook = new Workbook()
      const worksheet = workbook.addWorksheet('Employees Report')

      /* Add Company Name and Exported Date headers */
      worksheet.addRow(['Company Name', companyName || 'HR Academy']).font = { bold: true }
      worksheet.addRow(['Exported Date', getCurrentDate('exporting')]).font = { bold: true }

      /* Add a blank row for spacing */
      worksheet.addRow([])

      /* Add headers for employee data */
      const headers = ['Name', 'HR Code', 'Email', 'Status', 'Department', 'Position']
      worksheet.addRow(headers)

      /* Add data to the worksheet */
      flattenedData.forEach(employee => {
        const rowData = [
          employee.name,
          employee.hrcode,
          employee.email,
          employee.status,
          employee.department,
          employee.position
        ]
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
      saveAs(new Blob([buffer]), `Employees_Report_${getCurrentDate('exporting')}.xlsx`)
    } catch (error) {
      console.error('Error exporting employees to Excel:', error)
    }
  }

  return exportToExcel()
}
