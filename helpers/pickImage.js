import * as ImagePicker from 'expo-image-picker';

export const pickImage = async () =>{
    let preview_image = ''
    let upload_picture = ''
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 0.7,
    })
    if (!result.cancelled) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", result.uri, true);
            xhr.send(null);
        });
        upload_picture = blob
        // Implement a new Blob promise with XMLHTTPRequest
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(blob)
        fileReaderInstance.onload = () => {
            const base64data = fileReaderInstance.result;
            // console.log(base64data);
            preview_image = base64data
        }
    }
    return { preview_image, upload_picture}
}