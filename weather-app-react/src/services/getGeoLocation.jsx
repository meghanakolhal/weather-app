export const getGeoLocation = () => {
    
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
    resolve,reject,{
         enableHighAccuracy: true,
      timeout: 15000,
    }
    );
  });
  // const successCallback=(position)=>{
  //     console.log(position.coords)
  // }
  // const handleError=(error)=>{
  //   if(error.code==2){
  // alert("!!!You have denied the request to get current location.");}

  //  if(error.code==3){
  //     alert('!!!Ooops Position not available , please try again later')
  // }}
  // return navigator.geolocation.getCurrentPosition(successCallback, handleError);
};
