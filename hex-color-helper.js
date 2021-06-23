/*
This script is meant to be used with a Google Sheets spreadsheet. When you edit a cell containing a
valid CSS hexadecimal colour code (like #000 or #000000), the background colour will be changed to
that colour and the font colour will be changed to the inverse colour for readability.
To use this script in a Google Sheets spreadsheet:
1. go to Tools » Script Editor » Spreadsheet;
2. erase everything in the text editor;
3. change the title to "Set colour preview on edit";
4. paste this code in;
5. click File » Save.
*/

/*********
** Properties
*********/
/**
 * A regex pattern matching a valid CSS hex colour code.
 */
var colourPattern = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;


/*********
** Event handlers
*********/
/**
 * Sets the foreground or background color of a cell based on its value.
 * This assumes a valid CSS hexadecimal colour code like #FFF or #FFFFFF.
 */
function onEdit(e){
  // iterate over cell range  
  var range = e.range;
  var data = range.getValues(); // read all the data up front, rather than reading per cell, for an enormous speed boost
  var rowCount = range.getNumRows();
  var colCount = range.getNumColumns();
  for(var r = 0; r < rowCount; ++r) {
    for(var c = 0; c < colCount; ++c) {
      var value = data[r][c];
      
      if(isValidHex(value)) {
        var cell = range.getCell(r + 1, c + 1);
        cell.setBackground(value);
        // cell.setFontColor(getInverseHex(value));
        cell.setFontColor(value);
      }
    }
  }
};



/*********
** Helpers
*********/
/**
 * Get whether a value is a valid hex colour code.
 */
function isValidHex(hex) {
  return colourPattern.test(hex);
};

/**
 * Get a hex colour code that is the inverse of the provided code.
 * Derived from stackoverflow.com/questions/9600295 with added
 * support for CSS shorthand hex notation.
 */
function getInverseHex(hex) {
  // expand shorthand colour
  hex = hex.replace(/^#(.)(.)(.)$/, '#$1$1$2$2$3$3');
  
  // convert hex to decimal value
  var inverse = parseInt(hex.substring(1), 16);
  
  // invert colour
  inverse = 0xFFFFFF ^ inverse;
  
  // convert back to hex notation
  return '#' + ('000000' + inverse.toString(16)).slice(-6);
};
