import React from "react"
import { render } from "react-dom"
import {  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native"
import Icon from "react-native-vector-icons/AntDesign"

const Dev_Height = Dimensions.get("window").height
const Dev_Width = Dimensions.get("window").width


export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      city:"Rajkot",
      data:[],
      icon:"",
      city_display:"",
      desc:"",
      main:"",
      humidity:"",
      pressure:"",
      visibility:"",
      

    }
    this.fetch_weather()

  }

  fetch_weather=()=> {
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+this.state.city+'&appid=0f34037b2a5985aca5b054dc63d2fa14')   .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
        this.setState({ temp : (json.main.temp-273.15).toFixed(2)+" °C" })
        this.setState({ city_display : json.name })
        this.setState({ icon: json.weather[0].icon})
        this.setState({ desc : json.weather[0].description})
        this.setState({ main : json.weather[0].main})
        this.setState({ humidity : json.main.humidity+" %"})
        this.setState({ pressure : json.main.pressure+" hPa"})
        this.setState({ visibility : (json.visibility/1000).toFixed(2)+" Km"})
      })
      .catch((error)=> console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  render(){
  return (
      <SafeAreaView style={styles.container}>
         <ImageBackground source={{uri:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEBUQEBIVFRUPFRUQDxUVFRAVDxUVFRUWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lHyUtLS0tLS0tLS0tLS0vLS0tLS0tNy0tLSstLS0tKy0tLS0vLS0tLS0tLSstLS0tLS0tLf/AABEIASwAqAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAQIDBAUGB//EADUQAAICAAQDBgUEAgIDAQAAAAABAhEDEiExBEFRBRMiYXGhBjKBkbFSwdHwQuEU8SNicjP/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAmEQACAgICAQQBBQAAAAAAAAAAAQIRAxIhMUEEEyJRYTJCcdHw/9oADAMBAAIRAxEAPwD4lbCxUOj00QLYWxAKA7CxAKA7CxUAoDthbEAoDthbEAoDthbEAoDsLYgFAdsLEAoDtisAFALGIBQJBQ6A6UZEFDEKAUFAAoCoKGAoBQqGAoogGAoWIBgKAgGAoCAYCgIBgKFiAYCgSAYHXUyIKGA1AhEgGoIkpQaptfMrXmra/KYANQRAkBNQRAkFDUEQJUFDUEQJUKhqBAOgoUBAOgoUAca/OnmIdANQToKJ0FHXUxZCgolQUKFkaFROgotCyFBRKgomosjQUSoKFFsjQUSoKFCyAEqChQsiBKgoULIgSoKFCyIEqCiaiyIEqAULLqCidCo76nKyFBROgoaiyFCosoVDUtkKCidBRNRZCgonQqGoshQUToKGpbIUFE6ChqLIUFEqChQsjQqJ0FEoWQoKJ0FChZCgJ0IUU00Ki7KJxPTqefYqoVFuUMo1LZVQUWULKTUtldBRZlFlGoshlCidBQ1FldBlLKFlJqWyFBROgoaiyugosoKGosroKJ0FEoWQoVFlBQotldAToYoWbchFwNLgRcT1anl2KHEWUvcRZRqXYoyiyl+UTVav6kaLZTlFRPDnGXytMllIqatFba7KsospdlFlLqNirKGUtyhlJqNirKLKW5QyjUuxVlDKWZQyk1GxVQZS2hUNS7FeUWUtyhlJqNirKBZQyajY67wyDwza8Ii8M72cKMbwyLga3hleIkt2leivr0LaQpmZwLOP4LJwssSTcXJxjFVq0293fhTSb21S6WZeM41QelPK1pejdPdrZI5+NxeI0sKU01F5tNE5NfM/1PlZ4PUZ1L4Lo9WHFXyZTVPTfk1szThcXWklfmtzPLXy/u4kupxhKUH8TrJKS5Ns+Kjoo273tUvZ6l2Hclar70cxSNWBOjtDNJvs5yxxSLsTFUdWnS+ZqpRjfJ1s/wCSyNPVNP0HKCnFLdqtLyxrq3vs3oupysWXdYssktLp18vpruR+pnjl8+UPajJfHs6uUWUzYXHaeJX5qvc2cPj4Ut5va0lFuTelR1pLfdutHvs/Ss+Nrs4PHNMryhlFhzk3TSSbStuq010+50uy8DDxZ5XcqrM68KWjq9rb6da5EWaLpL+jXttdnNyhlPc8N2XwuJDKoxpvV6d4v/ZS3q/W7PL/ABH2NPhnakp4U3lhNJKVrWpLdPzWjr6Lc5aq6Io2zm5QoqwsZ7S18+f1NCp7EjNSJJNFdAWNAaJZ6RxIuP8AeYcK5Tpzi4ZuTazvokuX1+x0sDhE5NPwqKTfirE9X0jv/o5KTZ1cUc/C4ZylkWsrppatX+qvl/PkP4vhHB4OWGkrnKMXspVd6vd7Pwt8702NuJ2lhYEcmFljerlzt3rrzOB2vJ8RDLhSUnKSTSduXNK+WutOkZy8waLClI8knXoSi62J8Rw8sOThiRcZRdSTVNMhR4UqPSSRObvn7FY8xeuCBGXIvjLpp/dikaZpWjL5L5cTlW3ktefmUvGeK8taXd6Xqkt68kEIr7Dy6vlfTQzJTl2+Poq1XRCOq0LcOP7exHCw652XxidIQvtGZS+jRwsV/lb9dTsYU1lypeH7L6LY4uHA3cMr0fL1PVBJeDhJtnQn2xHDTefxJbWs17JUt9dzhYnbWJitQxJZlB71Tf066HejGChNNLxrxaU2ecnwmR6LTezGWOW074NQlCqNU8KM9YqvT+DLPCafp9/obcDEivm6adGyMkpPR73XlT6GmkyJtFEMb+8/9gVzw9fcCbSGsT2nEcTHBjnnPJbqNa4svKF+u9HnuJ+JJ4acIRUYteDW53tcpP5pXu36eZr7Y4HNFzxnnbtYa0i27tJa+CC113f2PLrgpOVLLcne75vqzy58mXaoo7Y1CuS2LzLO5NzvVVJ6b3Z6H4ZhKUpODdLVNVmTe1Lbd/jprxsLsvHekIq6/Wm66V15/Q39l9kYkZPDniSw5xUZZYXOWv8A8P5t+fMmFzT5iyzprszdrdlYneaScpu3NSlHwtyema6135czkYmFKLqSlF9Gmn9mel/4Tjj5mp/NCUsyVJtN+JtK5tRttaeL6v1nZ/Y2HLDzYsc9uThGdOFybk9Hqopt6XzfU6QwOStEeVR4Z8tTFmX8HqPir4dhgQjj8PmeHeTEt5oqXKSfKLemvM8wc5RcXRqMk1aG5aDITjb3JRIm75K6JpjsgSRtGSxMsUikmmdUzDRoUtKNfC4l6Nv+fqc9zLoSR2jLk5SjwdVxT63XUycbGWG1vrdPy501+C3Bmmg4madK3r11Wn/Z1krRzTpnMxJN7c9Xyuv3LIz0tdb80/3DiMHmvp/BRCdaM8rTT5O/aNSkn00Wn329AKH/AFgaslE+1e0sTGxfA9MuVVSpPVq/Yv7L4HEUlKdpJbuuXJNb+pu7M7OjBZp7vV3uvIv4rid5clpFHPHgd7zfJZ5FWsUWubwY2l/+lxjTl3i2XgjGLbpanE7J4zuZOe89YwUszbm/1c/U9Bw7bjnltkUeei3nXVvX26FeHwsNowim09f0Re+vnzfM7PHNytMwpxSpl2HixrD7yWk8SWJiTk/npeKSXrotK8OmzOnxnxFhKPcxcnKfgqEJycE9oJJavVeupgxFLGyxwpKKX+eVPFaiqvDf+L6S862sswsDuWo4UXPGknbm04wjrrOb+VvnSbe3mabyLhdfdD4vvsr7W7WxcWH/AB4YD7uKcbcZSvLs+7aU1Tq7W65q78tx/YuLCEsaOHirChSzYkMkuSvLd5bej89tz3HAYbk3nmtXFycU1bh8tN65U9dd3q6WhZxuEsjliTeam86lLRu9IZrcVetL62lRzlglL5Nmo5Yx4R8vTGej7U+HsTEisbh8O1Si4Qi7Sgks3RtqvO73OPw3ZWPiScYYM3JfMnFxr1zVR53CSlTR2UotWjKhxZ3ofBvGOLkoQ8O6zq76epRjfC/Fxaj3V5qpqUcuvJt0b9uf0ybx+zmxrmE1XodTtDsGeBGClOE8XFllWDC5TXm3/o6XF/BzwsNYmJxOFFV/5MyajDyzXcnemi1NU+eOjNr7PNQp7kqoeJhLXu5OcVtLLlfnpb8vuRUuT5/2wmGi3Cxmmae8tarT3+hzpOv2L4Ylo6Rn4MSh5LJTcXrdcnzZCWqbWv5+o5ztbepXa5ciNhIIvmv9AQjLUDKZpo7XE4izar7bauyWFh5n4tnokQmktZE8PE++yR6F3yeezZjYt1FfRen/AEXYcbWVbP53+3oY8OLbpfV/hGvFTiu6jrJpuW1Jevr+DoZOj2eszpbJK2q6aV0RVx2I7cYaS/ybVLoqa3S01KeB4vu4uK0ct2tab51ttRt4dqbVu6Wr60+fR/wa7J0R7M4HRRc3d5p1/LRr4jgljtq2lDSK3t83fUswdLrny5pdSziOKjgxUkrpOtmrWyavqbpJGLdnG7P7Sw4/+NStKWTW8t+Vem518TilLKly10bX3p6ryZ5dYUpYjx5pKc3bjtf06UdKHEzktIuK8t/S/wCDMW65NP8AB3f+XkVXWtvz516stxcdyqdrR7O9V0PM43Gxw145Qj1zNJ/nVmHtD4lTi4cOnT0nipZW1zUG9Vf6vtrqszzQj/P0ajilIv8AiHjuGw+LjxKbjLDzLEyXeLOsuSKW1X4pXV6LW68p2j2vLiJ95O26r/1iqWkfK9Q43HeLJNxjFRSikrdJbJXojP3aTvf11o+TJ5G3XCs90VFL8jjN5a1fpt939C6HDuVZm0o0klvT6v8Au41LQkpUn9vudVjX7uTLk/BXjYNOr9PTy8hLClF7b/jqizEmmtd+X8A/FJZm9Nq+i3K0k+Am65KpYlepXLFu68v+zq8RUsNPacea3aMWDhp8r5+ZZ45XVkjNVdFeEBuyYfSr2afK+jA6LG67MOaJOWZ68taLcPFuSW9uv9Gbg4SxHUdl80n8sV1b/rJYkMknkt/plbj67FUn2ZcfB1I47hpFJy11fLyXmWcJiyinKSu3vevTXTX9jgw71y8ClfRWaeNnicOoxxp6yj3ihHxPdpZntrT58uZXmSW0ie03wjpYmM53S1baVW29r8zTg9oww9HJ3/k9kl6ujyC7SxXdTaT3ql9LRneHKcvmjb/VOKX3bpHCXr0lcVZ1Xpr/AFM9fxnxLG6jJJVydv7pGGXbuubNJvdN8vTMcCUMvhrWO/WypPXX6dDEvWZfNG16eB3J9vzbzJO3zk9fb+TPPtfHla7xxT5Q8Pvv7mAVkc5v9UiqEV0ixRW9ffVmiOL16UZUycZFg0uhJX2WSZFsTIsrZEiyMiSmUWNSCkNS6ycdShSJpm1IjRrwcTRp/YhLCe8NHf0KMxdhYx0UlLhmGmuURji61JevX1AnjNPcCcrocM6+HxcXHLBeFby/xv6GrA4WEld67vWCVejZxeyMJw4iOLgTk8NU8STuKn1glz9dkdbH7Uinsm5a8n9+RrFm2jclX+8GJ46dI6nCwjHyXp4mcn4i4zAwnLJhrFxsTS8R5lhrbTDVRukvmTK+L4yXdSxXiKO0Yxg7m21zlXhS1enTc8vKbu+fv9zn6nM3HVHTDi5snGl4ppSl0dqK+i3/AAVzpv8A0kvsiIzwKKPUMncdqfsVjs6ELu7S0RS/71G2IrS8EQ0yVoiJx/vIXJdDhlil0HKdblcdOX2G0mtH6F3dcdkrkkn0X3H9itS5PQmmWLvyRoGg7z+8xiZefADMSjMolpo9vwF1+zRz92ma1RrU7AzZqA6+6vJjQvn2hiNU37IzubfNkaA4bN9nSkWyxnSXJa/UqAA232EqGNCAJgYgAAYIBFsDGJDLZBkXDmtABMrp9gGuv5YopomgsmiuxYWArA0QjiK0OOsaGJmHHmzQoPl0AdAWKdBkLABnIoWCEMAACwKBgICgYAAsgDEBqwOxMAFgEx2IBYGFiAWB2AgGwGAhCwIAGcjQgACgAAAQYkMVADAQygYCAoGAgBBgIAUYCAEGILAFAAEAIdiQzlZQGIDVgYCAtkGAAgAESFRaAgHQUKAhhQUAIBiAAAAlgAABYAAELAUFGruV5h3C6v2M0Uyjs09yvP2E8JefsWgZwNHcrz9geCvP2AKAL+5XmHcLzKQpsC7uV5j7lefsWwUAXdyvP2H3K8/YoKBl3crz9gWCur9gCgC/uV5+wdyvMAz0I09yvP2F3K6v2MtAz2Bo7hefsJYC6v2MspnA0vh11fsIA//Z"}} 
          style={styles.Image_Backround_Style}>

          <View style={styles.Serach_box_view}>
            <TextInput
             placeholder="search"
              placeholderTextColor="#FFF"
               style={styles.Serach_box}
               onChangeText={(Text)=>this.setState  ({city:Text})} />

              <TouchableOpacity style={styles.button_touch} onPress={this.fetch_weather}>
                <Icon name="search1" size={24} color="#FFF"/>

              </TouchableOpacity>

          </View>

          <View style={styles.Weather_Box_Main}>
          <View style={styles.Weather_Holder_View}>
              <Image tintColor='#FFF' source={{uri:"http://openweathermap.org/img/wn/"+this.state.icon+"@2x.png",}} style={styles.Weather_Image}/>
              <View>
                <Text style={styles.temprature_text}>{this.state.temp}</Text>
                <Text style={styles.city_text}>{this.state.city_display}</Text>
              </View>
            </View>

          </View>

          <View style={styles.Info_Box_View}>
          <View style={styles.Info_Holder_Veiw}>
            <Text style={styles.Main_Weather_Text}>{this.state.main}</Text>
            <Text style={styles.description_text}>{this.state.desc}</Text>
            <Text style={styles.humidity_text}>Humidity : {this.state.humidity}</Text>
            <Text style={styles.other_text}>Pressure : {this.state.pressure}</Text>
            <Text style={styles.other_text}>Visibility : {this.state.visibility}</Text>
          </View>
        </View>
      
          </ImageBackground>
          </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image_Backround_Style:{
    height:"100%",
    width:"100%"
  },
  Serach_box_view:{
    height:"20%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row" 
  },
  Serach_box:{
    height:"35%",
    width:"80%",
    borderColor:"#FFF",
    borderWidth:1,
    borderRadius:15,
    color:"#FFF",
    paddingHorizontal:15
  },
  button_touch:{
    marginLeft:"5%",
    height:"35%",
    width:"8%",
    justifyContent:"center",
    alignItems:"center"
  },
  Weather_Box_Main:{
    height:"30%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
  },
  Weather_Holder_View:{
    height:"80%",
    width:"90%",
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderRadius:15,
    alignItems:"center",
    flexDirection:"row",
    justifyContent:"center"
  },
  Weather_Image:{
    height:"80%",
    width:"50%"
  },
  temprature_text:{
    fontSize:30,
    color:"#FFF",
    marginLeft:"5%"
  },
  city_text:{
    fontSize:20,
    color:"#FFF",
    marginLeft:"5%",
    marginTop:"3%"
  },
  Info_Box_View:{
    height:"45%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
  Info_Holder_Veiw:{
    height:"80%",
    width:"90%",
    
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius:15
  },
  Main_Weather_Text:{
    fontSize:28,
    color:"#FFF",
    marginLeft:"8%",
    marginTop:"8%",
    fontWeight:"bold"
  },
  description_text:{
    fontSize:20,
    color:"#FFF",
    marginLeft:"8%",
    marginTop:"3%"
  },
  humidity_text:{
    fontSize:18,
    color:"#FFF",
    marginLeft:"8%",
    marginTop:"5%"
  },
  other_text:{
    fontSize:18,
    color:"#FFF",
    marginLeft:"8%",
    marginTop:"2%"
  }
})
