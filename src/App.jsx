import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Auth/Login";
import SidebarWithHeader from "./components/SidebarWithHeader/SidebarWithHeader";
import HomeDashboard from "./components/Dash/Home";
import Article from "./components/UserManagment/UsersTable";
import TabsSalesPerson from "./components/he/TabsSalesPerson";
import Fullnews from "./components/he/UpdatePerson";
import AddCategoryAndSubcategoryForm from "./components/makingcharges/addCatSubcatform.js";
import PremiumCharges from "./components/Premium/premium";
import Edit from "./components/editArticle/Edit";

function App() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [loggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  });
  useEffect(() => {
    setLoggedIn(() => {
      const token = localStorage.getItem("token");
      return token ? true : false;
    });
    setTimeout(() => {
      setInitialLoad((prev) => false);
    }, 1000);
    console.log("loggedIn:", loggedIn);
  }, [loggedIn]);

  return (
    <>
      {initialLoad ? (
        <>Loading...</>
      ) : (
        <>
          {loggedIn ? (
            <SidebarWithHeader setLoggedIn={setLoggedIn}>
              <Routes>
                {loggedIn ? (
                  <>
                    <Route path="/" element={<HomeDashboard />} />
                    <Route path="/articles" element={<Article />} />
                    <Route path="/category" element={<TabsSalesPerson />} />
                    <Route path="/Backup" element={<PremiumCharges />} />
                    <Route path="/singlearticle" element={<Fullnews />} />
                    <Route
                      path="/addcategory"
                      element={<AddCategoryAndSubcategoryForm />}
                    />
                    <Route path="/edit/:id" element={<Edit />} />
                  </>
                ) : (
                  <>
                    <Route
                      path="*"
                      element={<Login setLoggedIn={setLoggedIn} />}
                    />{" "}
                  </>
                )}
              </Routes>
            </SidebarWithHeader>
          ) : (
            <Routes>
              <Route path="*" element={<Login setLoggedIn={setLoggedIn} />} />
            </Routes>
          )}
        </>
      )}
    </>
  );
}

export default App;
