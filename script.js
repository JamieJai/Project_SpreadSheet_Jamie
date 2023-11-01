document.getElementById('spreadsheetTable').addEventListener('click', function(e) {
    if (e.target.tagName === 'TD') {
        const rowIndex = e.target.parentNode.rowIndex;
        const colIndex = e.target.cellIndex;

        const rowLabel = rowIndex === 0 ? '' : rowIndex;
        const colLabel = String.fromCharCode(64 + colIndex);

        document.getElementById('currentPosition').innerText = colLabel + rowLabel;

        document.querySelectorAll('.selected').forEach(cell => {
            cell.classList.remove('selected');
        });

        document.querySelector(`#spreadsheetTable tr:nth-child(${rowIndex + 1}) td:nth-child(1)`).classList.add('selected');
        document.querySelector(`#spreadsheetTable tr:nth-child(1) td:nth-child(${colIndex + 1})`).classList.add('selected');
    }
});

document.getElementById('exportBtn').addEventListener('click', function() {
    const table = document.getElementById('spreadsheetTable');
    let csv = [];
    for (let i = 0; i < table.rows.length; i++) {
        let rowData = [];
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            rowData.push(table.rows[i].cells[j].innerText);
        }
        csv.push(rowData.join(','));
    }
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'spreadsheet.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

function addRow() {
    const table = document.getElementById('spreadsheetTable');
    const newRow = table.insertRow();
    const newRowIndex = newRow.rowIndex;

    const indexCell = newRow.insertCell();
    indexCell.classList.add('index');
    indexCell.textContent = newRowIndex;

    for (let i = 1; i < table.rows[0].cells.length; i++) {
        const newCell = newRow.insertCell();
        newCell.contentEditable = "true";
    }
}

function addColumn() {
    const table = document.getElementById('spreadsheetTable');
    const newColIndex = table.rows[0].cells.length;

    for (let i = 0; i < table.rows.length; i++) {
        const newCell = table.rows[i].insertCell();
        newCell.contentEditable = "true";

        if (i === 0) {
            newCell.classList.add('index');
            newCell.textContent = String.fromCharCode(64 + newColIndex);
            newCell.contentEditable = "false";
        }
    }
}

for (let i = 1; i <= 9; i++) {
    addRow();
}