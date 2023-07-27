import { Puff } from "react-loader-spinner";
const Loader=()=>{

return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh',flexDirection:'column'}}>

        <Puff
          height="80"
          width="80"
          radius="9"
          color="rgb(73, 197, 238)"
          ariaLabel="is loading"
          wrapperStyle
          wrapperClass
          
        />
        <p style={{fontSize:'20px',marginTop:'1em'}}>Loading...</p>
    </div>
);}
export default Loader;