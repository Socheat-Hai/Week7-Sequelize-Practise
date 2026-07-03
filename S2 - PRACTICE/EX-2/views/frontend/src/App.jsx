// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// // import './App.css'

// import StudentView from "./views/studentView";

// function App() {

//   return (
//     <>
//       <StudentView />
//     </>
//   )
// }

// export default App


import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthorList from "./views/authorView";
import AddBook from "./views/authorView/AddBook";
import EditBook from "./views/authorView/EditBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthorList />} />
        <Route path="/authors/:authorId/books/add" element={<AddBook />} />
        <Route path="/books/:id/edit" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;