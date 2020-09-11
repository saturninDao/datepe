export class MyConfig{
    public firebaseConfigG = {
        apiKey: "AIzaSyA2mW_oF5luO3Pgfw9wZhHkeZsTmSdTT6M",
        authDomain: "projetdatepe.firebaseapp.com",
        databaseURL: "https://projetdatepe.firebaseio.com",
        projectId: "projetdatepe",
        storageBucket: "projetdatepe.appspot.com",
        messagingSenderId: "795223268905",
        appId: "1:795223268905:web:4491ce3cee05b2730f4638"    
      }

      getConfig(){
          return this.firebaseConfigG;
      }
}


