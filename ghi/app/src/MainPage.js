function MainPage() {
  const myStyle = {
    backgroundImage: "url(/logo.png)",
    height: "100vh",
    width: "100vh",
    margin:"auto",
    fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div className="px-4 py-5 my-5 text-center">
      <div style={myStyle}>
        <h1 className="display-5 fw-bold">CarCar Employee Portal '23</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4"><b></b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
