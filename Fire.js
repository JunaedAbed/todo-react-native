import firebase, { auth } from "firebase";
import "@firebase/firestore";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_B6SxTGS3LrYbFPEwekMxZEVBC1F8IdA",
  authDomain: "todoapprn-3f671.firebaseapp.com",
  projectId: "todoapprn-3f671",
  storageBucket: "todoapprn-3f671.appspot.com",
  messagingSenderId: "946062573121",
  appId: "1:946062573121:web:4df01096d9e96d9fa550c0",
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    if (!firebase.apps.length) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((err) => {
            callback(err);
          });
      }
    });
  }

  getLists(callback) {
    let ref = this.ref.orderBy("name");

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  }

  addList(list) {
    let ref = this.ref;

    ref.add(list);
  }

  updateList(list) {
    let ref = this.ref;

    ref.doc(list.id).update(list);
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  get ref() {
    return firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");
  }

  detach() {
    this.unsubscribe();
  }
}

export default Fire;
