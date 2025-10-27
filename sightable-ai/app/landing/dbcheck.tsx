import { getRandomValues, randomInt } from "crypto";
import * as dbTools from "../lib/databaseTools"

export default function DatabaseWorking() {
  /*dbTools.getAllUsers().then((s) => {
    console.log(s);
  });

  dbTools.getUser("test@sightable.ai").then((s) => {
    console.log(s);
  });

  dbTools.getPassWord("test@sightable.ai").then((s) => {
    console.log(s);
  });

  dbTools.checkPassword("test@sightable.ai", "test1223.").then((s) => {
    if(s != null) {console.log((s > 0) ? "True" : "False");}
  });*/
  
  dbTools.getAllGuests().then((s) => {
    //console.log(s);
  });

  dbTools.getGuestUser("guest12345678@sightable.ai").then((s) => {
    //console.log(s);
  });

    dbTools.checkGuestUser("guest12345678@sightable.ai").then((s) => {
    //console.log(s);
  });

  dbTools.getGuestCharacteristic("guest12345678@sightable.ai").then((s) => {
    //console.log(s);
  });

  dbTools.getGuestRemainingUses("guest12345678@sightable.ai").then((s) => {
    //console.log(s);
  });


  return <h1></h1>;
}
