import MainNavigation from "./MainNavigation/MainNavigation";
import Main from "./Main/Main";
import Footer from './../Home/Footer/Footer';


export default function Layout(props) {
  // console.log(props);
  return (
    <div className="">
      <MainNavigation />
      <Main>{props.children}</Main>
      <Footer />
    </div>
  );
}
