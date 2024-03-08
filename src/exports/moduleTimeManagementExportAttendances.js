import { Workbook } from 'exceljs'
import { saveAs } from 'file-saver'
import { formatTime } from 'src/configs/helper'

// Function to get the current date
function getCurrentDate(format) {
  const date = new Date()
  if (format === 'exporting') {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  // Add other date formats if needed
}

// Function to export attendances to XLSX
export function exportAttendancesToXLSX(sheet1Data, sheet2Data) {
  const workbook = new Workbook()

  const exportToExcel = async () => {
    try {
      // Save the workbook
      await createWorksheets(sheet1Data, sheet2Data, workbook)
      const buffer = await workbook.xlsx.writeBuffer()
      saveAs(new Blob([buffer]), `Attendances_Report_${getCurrentDate('exporting')}.xlsx`)
    } catch (error) {
      console.error('Error exporting Attendance to Excel:', error)
    }
  }

  const createWorksheets = async (sheet1Data, sheet2Data, workbook) => {
    await createSummaryWorksheet(sheet1Data, workbook)
    await createDetailWorksheet(sheet2Data, workbook)
  }

  const createSummaryWorksheet = async (data, workbook) => {
    const worksheet = workbook.addWorksheet('Summary')
    worksheet.addRow(['Exported Date', getCurrentDate('exporting')]).font = { bold: true }
    worksheet.addRow([])

    const headers = ['Name', 'Total Days In', 'Total Days Off', 'Total Work Hours', 'Total Late', 'Total Work Days']
    worksheet.addRow(headers)

    // Add data rows
    data.forEach(_ => {
      const rowData = [
        _.name,
        _.totalDayIn ?? 0,
        _.totalDayOff ?? '0',
        formatTime(_.totalWorkingHours) ?? 0,
        _.totalLate ?? 0,
        22
      ]
      worksheet.addRow(rowData)
    })

    /* Apply styling to rows and cells */
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        if (rowNumber !== 1) {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          }
        }
        if (rowNumber === 3) {
          // Style for the combined header and the regular header
          cell.font = { bold: true }
          cell.alignment = { vertical: 'middle', horizontal: 'center' }
        }
      })
    })

    // Auto-fit columns (if needed)
    worksheet.columns.forEach(column => {
      column.width = 15 // Set default width
    })
  }

  const createDetailWorksheet = async (data, workbook) => {
    const totalDays = new Date(data[0].exportYear, data[0].exportMonth, 0).getDate()
    const worksheet = workbook.addWorksheet('Detail')

    /* Add headers for data */
    const headers = ['Name']

    for (let i = 1; i <= totalDays; i++) {
      headers.push(String(i))
    }

    const combinedHeader = ['Name', 'Date'] // Combined header "Name, Date"
    worksheet.addRow(combinedHeader)
    const combinedHeaderRow = worksheet.getRow(1)
    combinedHeaderRow.font = { bold: true }

    /* Merge cells for the "Date" header */
    worksheet.mergeCells(1, 2, 1, totalDays + 1)
    const dateHeaderCell = combinedHeaderRow.getCell(2)
    dateHeaderCell.alignment = { vertical: 'middle', horizontal: 'right' }

    worksheet.spliceRows(2, 1)
    worksheet.addRow(headers)

    /* Merge cells for the "Name" header */
    worksheet.mergeCells(1, 1, 2, 1)
    const nameHeaderCell = combinedHeaderRow.getCell(1)
    nameHeaderCell.alignment = { vertical: 'middle', horizontal: 'center' }

    // Add data rows
    data.forEach(employee => {
      const rowData = [employee.name]
      for (let i = 1; i <= totalDays; i++) {
        rowData.push(employee[`day_${i}`] ? 'present' : 'absent')
      }
      worksheet.addRow(rowData)
    })

    /* Apply styling to rows and cells */
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
        if (rowNumber === 1 || rowNumber === 2) {
          // Style for the combined header and the regular header
          cell.font = { bold: true }
          cell.alignment = { vertical: 'middle', horizontal: 'center' }
        } else {
          cell.alignment = { vertical: 'middle', horizontal: 'left' }

          if (colNumber !== 1) {
            cell.alignment = { vertical: 'middle', horizontal: 'center' }

            // Apply background color for absent cells
            if (cell.value === 'absent') {
              cell.font = { color: { argb: 'FF0000' } }
            } else if (cell.value === 'present') {
              cell.font = { color: { argb: '00FF00' } }
            }
          }
        }
      })
    })

    // Auto-fit column A
    autoFitColumn(worksheet, 'A')

    // Freeze the "Name" column
    worksheet.views = [
      {
        state: 'frozen',
        xSplit: 1, // Freeze at the first column
        ySplit: 2, // Freeze at the second row (below headers)
        topLeftCell: 'B3', // Start scrolling from cell B3 (excluding frozen headers)
        activeCell: 'B3' // Make cell B3 active after freezing
      }
    ]
  }

  const autoFitColumn = (worksheet, columnName) => {
    let maxLength = 0
    worksheet.getColumn(columnName).eachCell({ includeEmpty: true }, cell => {
      maxLength = Math.max(maxLength, cell.value ? cell.value.toString().length : 0)
    })
    worksheet.getColumn(columnName).width = maxLength < 15 ? 15 : maxLength // Set a minimum width
  }

  return exportToExcel()
}
