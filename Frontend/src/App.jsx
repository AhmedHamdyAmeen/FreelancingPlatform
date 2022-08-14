import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import Loader from "./components/Loader/Loader";
import Layout from "./components/Layout/Layout";
import ProjectPrivate from "./pages/FindProjects/ProjectPrivate";
import ProjectProposal from "./pages/FindProjects/ProjectProposal";
import UpdateProject from "./pages/FindProjects/UpdateProject";
import AddProject from "./pages/FindProjects/AddProject";
import NotFound from "./components/NotFound/NotFound";
import Projects from "./pages/FindProjects/Projects";
import Project from "./pages/FindProjects/Project";
import TestimonialForm from "./components/FindProjects/TestimonialForm/TestimonialForm";

import Product from "./pages/Store/Product";
import ProductDetails from "./pages/Store/ProductDetails";
import CreateProduct from "./pages/Store/CreateProduct";
import UpdateProduct from "./pages/Store/UpdateProduct";

// Hamdy
import Home from "./pages/Home/Home";
import Login from "./components/Auth/login/Login";
import Register from "./components/Auth/Register/Register";
import ActivateMail from "./components/Auth/Register/ActivateMail";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import AdminLogin from "./components/Auth/login/AdminLogin";
import AdminRegister from "./components/Auth/Register/AdminRegister";
import ChangePassword from "./components/Auth/ChangePassword/ChangePassword";
import Admin from "./pages/Admin/Admin";

const FreelancerProfile = React.lazy(() =>
  import("./pages/Profiles/FreelancerProfile")
);
const TeamProfile = React.lazy(() => import("./pages/Profiles/TeamProfile"));
const ClientProfile = React.lazy(() =>
  import("./pages/Profiles/ClientProfile")
);
const CompanyProfile = React.lazy(() =>
  import("./pages/Profiles/CompanyProfile")
);

function App() {
  let token = localStorage.getItem("token");
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Switch>
          {/* Public Routes */}
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/admin/login" exact component={AdminLogin} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/admin/register" exact component={AdminRegister} />
          <Route
            path="/activate-account/:userType?/:vToken?"
            exact
            component={ActivateMail}
          />
          <Route
            path="/forgot-password/:userType?/:rToken?"
            exact
            component={ForgotPassword}
          />
          <Route path="/change-password" exact component={ChangePassword} />
          {/* Protected (Private) Routes Here */}
          {/* {token ? "" : ""} */}

          <Route path="/freelancer/:id" exact component={FreelancerProfile} />
          <Route path="/team/:id" exact component={TeamProfile} />
          <Route path="/client/:id" exact component={ClientProfile} />
          <Route path="/company/:id" exact component={CompanyProfile} />
          <Route path="/project" exact component={Projects} />
          <Route path="/project/:id/private" exact component={ProjectPrivate} />
          <Route path="/project/:id/update" exact component={UpdateProject} />
          <Route
            path="/project/:id/proposal"
            exact
            component={ProjectProposal}
          />
          <Route path="/project/:id/finish" exact component={TestimonialForm} />
          <Route path="/project/add" exact component={AddProject} />
          <Route path="/project/:id" exact component={Project} />
          <Route path="/product" exact component={Product} />
          <Route path="/product/details/:id" exact component={ProductDetails} />
          <Route path="/product/create" exact component={CreateProduct} />
          <Route path="/product/update/:id" exact component={UpdateProduct} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
