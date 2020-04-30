/*
helpful links for project
https://www.lucidchart.com/techblog/2017/12/07/6-deadly-sins-google-apps-script-add-on/
how to setup clasp (google apps script) in VSCode instructions
https://yagisanatode.com/2019/04/01/working-with-google-apps-script-in-visual-studio-code-using-clasp/
*/

function createFilesInFolder() {
  //This creates the folder and gets ID of folder
  //TODO - make sure this foldername doesn't already exist so user can run script many times
  var folderId = DriveApp.createFolder('NewsGen').getId();
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
}