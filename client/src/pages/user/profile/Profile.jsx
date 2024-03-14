import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { fetchCurrentUser } from "../../../redux/authSlice";
import SpinnerLoading from "../../../components/spinner/SpinnerLoading";
import Footer from "../../../components/Footer";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./profile.css";

const Profile = () => {
  const [details, setDetails] = useState({});
  // const { userId } = useParams();
  // console.log(useParams());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser())
      .then((response) => {
        console.log(response.payload.currentUser);
        setDetails(response.payload.currentUser);
      })
      .catch((error) => console.log(error));
  }, [dispatch]);
  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="6" className="mb-4 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                <MDBRow className="g-0">
                  <MDBCol
                    md="4"
                    className="gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <MDBCardImage
                      src={details.picture}
                      alt="Avatar"
                      className="my-5 square bg-primary rounded-circle"
                      style={{ width: "100px", height:"100px" }}
                      fluid
                    />
                    <MDBTypography tag="h5">{details.username}</MDBTypography>
                    <MDBCardText>Web Designer</MDBCardText>
                    <Link to={"/edit/" + details._id}>
                      <MDBIcon far icon="edit mb-5" />
                    </Link>
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">Information</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">
                            {details.email}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Phone</MDBTypography>
                          <MDBCardText className="text-muted">
                            123 456 789
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <MDBTypography tag="h6">Projects</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Recent</MDBTypography>
                          <MDBCardText className="text-muted">
                            Lorem ipsum{" "}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Most Viewed</MDBTypography>
                          <MDBCardText className="text-muted">
                            Dolor sit amet{" "}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <div className="d-flex justify-content-start">
                        <a href="#!">
                          <MDBIcon fab icon="facebook me-3" size="lg" />
                        </a>
                        <a href="#!">
                          <MDBIcon fab icon="twitter me-3" size="lg" />
                        </a>
                        <a href="#!">
                          <MDBIcon fab icon="instagram me-3" size="lg" />
                        </a>
                      </div>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
};

export default Profile;
