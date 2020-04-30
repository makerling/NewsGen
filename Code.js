/*
helpful links for project
https://www.lucidchart.com/techblog/2017/12/07/6-deadly-sins-google-apps-script-add-on/
how to setup clasp (google apps script) in VSCode instructions
https://yagisanatode.com/2019/04/01/working-with-google-apps-script-in-visual-studio-code-using-clasp/
*/

var sourceId = []

function createFilesInFolder() {
  //This checks existence then creates the folder and gets ID of folder
  var folder = DriveApp.getFoldersByName("NewsGen");
  try {
    var folderName = folder.next();
    Logger.log("folder exists, skipping creation")
  }
  catch(e) {
    var folderId = DriveApp.createFolder("NewsGen").getId();
    Logger.log("folder doesn't exists, creating it now")
    Logger.log("folder id is: " + folderId)
    //This creates a file in the folder
    var name = 'source'
    var resource = {
      title: name,
      mimeType: MimeType.GOOGLE_SHEETS,
      parents: [{ id: folderId }]
    }
    //Drive class needs Advanced Drive API turned on to make this call work: 
    //Resources > Advanced Google services ... > Drive API > On
    var fileJson = Drive.Files.insert(resource)
    var fileId = fileJson.id
    Logger.log("fileId is: " + fileId)
    sourceId.push(fileId); 
  }
}

/**
 * Creates a trigger for when a spreadsheet opens.
 */
function createSpreadsheetOpenTrigger() {
  var ss = SpreadsheetApp.openById(sourceId[0]);
  ScriptApp.newTrigger('myFunction')
      .forSpreadsheet(ss)
      .onOpen()
      .create();
}