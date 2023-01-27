export async function sendFeedback(feedback: any): Promise<Response> {
  try {
    const response = await fetch('https://api.ishihara-app.com/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: feedback,
    });
    return response
  } catch (error) {
    return error
  }
}
// TODO: Waiting for upload-file endpoint implementation https://moduscreate.atlassian.net/browse/FSET-1037
// export async function getImageBlob(screenshotPath: string): Promise<Blob> {
//   const file = await fetch(screenshotPath);
//   const blob = await file.blob();
//   return blob
// }
// export async function uploadFileToS3(screenshotPath: string): Promise<Response> {
//   try {
//     const screenshotBlob = await getImageBlob(screenshotPath)
//     const response = await fetch('https://api.ishihara-app.com/upload-file', {
//       method: 'POST',
//       body: screenshotBlob,
//     });
//     return response
//   } catch (error) {
//     return error
//   }
// }