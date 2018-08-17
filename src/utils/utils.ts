function ShowToast(taostCtrl, message, position = "top") {
  let toast = taostCtrl.create({
    message,
    position,
    duration: 2000
  });
  toast.present();
}

//Showing toast:
// export default ShowToast;
