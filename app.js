import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GithubAuthProvider, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";


  const firebaseConfig = {
    apiKey: "AIzaSyCWVrJUrs2vw2h75hb7h8-aq6MU3Z7OzLs",
    authDomain: "blog-app-5367e.firebaseapp.com",
    projectId: "blog-app-5367e",
    storageBucket: "blog-app-5367e.appspot.com",
    messagingSenderId: "830498196642",
    appId: "1:830498196642:web:36ca64731c0cdef5b29bfb",
    measurementId: "G-FPJVXN1574"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const loginForm = document.querySelector(".sign-in-form");
const registerForm = document.querySelector(".sign-up-form");
const homeTab = document.querySelector(".home-tab");
const logoutBtn = document.getElementById('logout')
let uid = ''




logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
      alert ("Sign-out successful.")
}).catch((error) => {
  alert ("An error happened.")
});
})

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

onAuthStateChanged(auth, user => {
    if (user) {
      uid = user.uid
      console.log('User is logged in')
      container.style.display = 'none'
      homeTab.style.display = 'block'
    //   getTodos()
    } else {
      console.log('User is logged out')
      container.style.display = 'block'
     homeTab.style.display = 'none'
    }
  })

  registerForm?.addEventListener('submit', e => {
    e.preventDefault()
    console.log(e)
    const userInfo = {
      fullname: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value
    }
    createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then(userCredential => {
        const user = userCredential.user
        console.log('user->', user)
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('errorMessage->', errorMessage)
      })
  })
  
  loginForm?.addEventListener('submit', e => {
    e.preventDefault()
    console.log(e)
    const userInfo = {
      email: e.target[0].value,
      password: e.target[1].value
    }
    signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user
        console.log('user logged in->', user)
        // ...
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('errorMessage user not logged in->', errorMessage)
  
        // ..
      })
  })









































  const list_el = document.getElementById("list");
const create_btn_el = document.getElementById("create");

let todos = [];

create_btn_el.addEventListener('click', CreateNewTodo);

function CreateNewTodo () {
	const item = {
		id: new Date().getTime(),
		text: "",
		complete: false
	}

	todos.unshift(item);

	const { item_el, input_el } = CreateTodoElement(item);

	list_el.prepend(item_el);

	input_el.removeAttribute("disabled");
	input_el.focus();

	Save();
}

/* <div class="item">
	<input type="checkbox" />
	<input 
		type="text" 
		value="Todo content goes here" 
		disabled />
	<div class="actions">
		<button class="material-icons">edit</button>
		<button class="material-icons remove-btn">remove_circle</button>
	</div>
</div> */
function CreateTodoElement(item) {
	const item_el = document.createElement("div");
	item_el.classList.add("item");

	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.checked = item.complete;

	if (item.complete) {
		item_el.classList.add("complete");
	}

	const input_el = document.createElement("input");
	input_el.type = "text";
	input_el.value = item.text;
	input_el.setAttribute("disabled", "");

	const actions_el = document.createElement("div");
	actions_el.classList.add("actions");

	const edit_btn_el = document.createElement("button");
	edit_btn_el.classList.add("material-icons");
	edit_btn_el.innerText = "edit";

	const remove_btn_el = document.createElement("button");
	remove_btn_el.classList.add("material-icons", "remove-btn");
	remove_btn_el.innerText = "remove_circle";

	actions_el.append(edit_btn_el);
	actions_el.append(remove_btn_el);

	item_el.append(checkbox);
	item_el.append(input_el);
	item_el.append(actions_el);

	// EVENTS
	checkbox.addEventListener("change", () => {
		item.complete = checkbox.checked;

		if (item.complete) {
			item_el.classList.add("complete");
		} else {
			item_el.classList.remove("complete");
		}

		Save();
	});

	input_el.addEventListener("input", () => {
		item.text = input_el.value;
	});

	input_el.addEventListener("blur", () => {
		input_el.setAttribute("disabled", "");
		Save();
	});

	edit_btn_el.addEventListener("click", () => {
		input_el.removeAttribute("disabled");
		input_el.focus();
	});

	remove_btn_el.addEventListener("click", () => {
		todos = todos.filter(t => t.id != item.id);

		item_el.remove();

		Save();
	});

	return { item_el, input_el, edit_btn_el, remove_btn_el }
}

function DisplayTodos() {
	Load();

	for (let i = 0; i < todos.length; i++) {
		const item = todos[i];

		const { item_el } = CreateTodoElement(item);

		list_el.append(item_el);
	}
}

DisplayTodos();

function Save() {
	const save = JSON.stringify(todos);
	
	localStorage.setItem("my_todos", save);
}

function Load() {
	const data = localStorage.getItem("my_todos");

	if (data) {
		todos = JSON.parse(data);
	}
}