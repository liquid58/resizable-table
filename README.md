# README.md

# Resizable Table

A lightweight jQuery plugin for resizable HTML table columns with:

* Drag to resize columns
* LocalStorage persistence
* Ellipsis support for long headers
* Reset column widths
* Multiple table support
* No dependencies except jQuery

## Installation

```html
<link rel="stylesheet" href="resizable-table.css">

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="resizable-table.js"></script>
```

## Usage

```javascript
$(function () {
    $("#dataTable").resizableTable({
        minWidth: 60,
        saveState: true
    });
});
```

## Example

```html
<table id="dataTable" class="resizable-table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Project Name</th>
            <th>Status</th>
            <th>Owner</th>
        </tr>
    </thead>
</table>
```

## Features

* Resize columns by dragging
* Width persistence using LocalStorage
* Automatic text truncation with ellipsis
* Tooltip support for full header text
* Lightweight and framework independent

## License

MIT
