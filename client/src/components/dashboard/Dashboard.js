import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/spinner";
import { getCurrentProfile } from "../../Actions/profile";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard </h1>
      <p className="lead">
        <i className="fas fa-user"></i>Welcome{user && user.name}
      </p>
      {profile}!== null ?({" "}
      <Fragment>
        <DashboardActions />
        <Experience experience={profile.experience} />
        <Experience education={profile.education} />
        <div className="my-2">
          <button className="btn btn-danger">
            <i className="fas fa-user-minus"></i>Delete my account
          </button>
        </div>
      </Fragment>
      ):(
      <Fragment>
        <p>You Don't Have Profile please sign up</p>
        <Link to="/create-profile" className="btn btn-primart my-1">
          Create Profile
        </Link>
      </Fragment>
      )
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
