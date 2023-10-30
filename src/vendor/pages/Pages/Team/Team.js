import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, Label, Modal, ModalBody, Offcanvas, OffcanvasBody, Row, UncontrolledDropdown, FormFeedback, ModalHeader } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import DeleteModal from "../../../Components/Common/DeleteModal";
import { ToastContainer } from 'react-toastify';

// Rating
import Rating from "react-rating";

//User Images
import avatar2 from '../../../assets/images/users/avatar-2.jpg';

//Small Images
import smallImage9 from '../../../assets/images/small/img-9.jpg';
//redux
import { useSelector, useDispatch } from 'react-redux';

//import action
import {
    getTeamData as onGetTeamData,
    deleteTeamData as onDeleteTeamData,
    addTeamData as onAddTeamData
} from "../../../store/actions";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

const Team = () => {
    document.title = "Team | Velzon - React Admin & Dashboard Template";

    const dispatch = useDispatch();

    const { teamData } = useSelector((state) => ({
        teamData: state.Team.teamData,
    }));

    const [team, setTeam] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        dispatch(onGetTeamData());
    }, [dispatch]);

    useEffect(() => {
        setTeam(teamData);
    }, [teamData]);

    // delete
    const onClickData = (team) => {
        setTeam(team);
        setDeleteModal(true);
    };

    const handleDeleteTeamData = () => {
        if (team) {
            dispatch(onDeleteTeamData(team));
            setDeleteModal(false);
        }
    };

    useEffect(() => {
        const list = document.querySelectorAll(".team-list");
        const buttonGroups = document.querySelectorAll('.filter-button');
        for (let i = 0; i < buttonGroups.length; i++) {
            buttonGroups[i].addEventListener('click', onButtonGroupClick);
        }

        function onButtonGroupClick(event) {
            if (event.target.id === 'list-view-button' || event.target.parentElement.id === 'list-view-button') {
                document.getElementById("list-view-button").classList.add("active");
                document.getElementById("grid-view-button").classList.remove("active");
                list.forEach(function (el) {
                    el.classList.add("list-view-filter");
                    el.classList.remove("grid-view-filter");
                });

            } else {
                document.getElementById("grid-view-button").classList.add("active");
                document.getElementById("list-view-button").classList.remove("active");
                list.forEach(function (el) {
                    el.classList.remove("list-view-filter");
                    el.classList.add("grid-view-filter");
                });
            }
        }
    }, []);


    //Modal  
    const [modal, setModal] = useState(false);
    const openModal = () => setModal(!modal);

    //OffCanvas  
    const [isOpen, setIsOpen] = useState(false);
    const [sideBar, setSideBar] = useState([]);

    //Dropdown
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggledropDown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            name: '',
            designation: '',
            projectCount: '',
            taskCount: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter team Name"),
            designation: Yup.string().required("Please Enter Your designation"),
            projectCount: Yup.number().required("Please Enter Your projectCount"),
            taskCount: Yup.number().required("Please Enter Your taskCount")
        }),
        onSubmit: (values) => {
            const newTeamData = {

                id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                name: values.name,
                designation: values.designation,
                projectCount: values.projectCount,
                taskCount: values.taskCount
            };
            // save new TeamData
            dispatch(onAddTeamData(newTeamData));
            validation.resetForm();
        },
    });
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <DeleteModal
                show={deleteModal}
                onDeleteClick={() => handleDeleteTeamData()}
                onCloseClick={() => setDeleteModal(false)}
            />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Team" pageTitle="Pages" />
                    <Card>
                        <CardBody>
                            <Row className="g-2">
                                <Col sm={4}>
                                    <div className="search-box">
                                        <Input type="text" className="form-control" placeholder="Search for name, tasks, projects or something..." />
                                        <i className="ri-search-line search-icon"></i>
                                    </div>
                                </Col>
                                <Col className="col-sm-auto ms-auto">
                                    <div className="list-grid-nav hstack gap-1">

                                        <Button color="info" id="grid-view-button" className="btn btn-soft-info nav-link btn-icon fs-14 active filter-button"><i className="ri-grid-fill"></i></Button>
                                        <Button color="info" id="list-view-button" className="btn btn-soft-info nav-link  btn-icon fs-14 filter-button"><i className="ri-list-unordered"></i></Button>
                                        <Dropdown
                                            isOpen={dropdownOpen}
                                            toggle={toggledropDown}>
                                            <DropdownToggle type="button" className="btn btn-soft-info btn-icon fs-14">
                                                <i className="ri-more-2-fill"></i>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <li><Link className="dropdown-item" to="#">All</Link></li>
                                                <li><Link className="dropdown-item" to="#">Last Week</Link></li>
                                                <li><Link className="dropdown-item" to="#">Last Month</Link></li>
                                                <li><Link className="dropdown-item" to="#">Last Year</Link></li>
                                            </DropdownMenu>
                                        </Dropdown>
                                        <Button color="success"
                                            onClick={openModal}>
                                            <i className="ri-add-fill me-1 align-bottom"></i> Add Members</Button>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                    <Row>
                        <Col lg={12}>
                            <div>
                                <Row className="team-list grid-view-filter">
                                    {(teamData || []).map((item, key) => (
                                        <Col key={key}>
                                            <Card className="team-box">
                                                <div className="team-cover">
                                                    <img src={item.backgroundImg} alt="" className="img-fluid" />
                                                </div>
                                                <CardBody className="p-4">
                                                    <Row className="align-items-center team-row">
                                                        <Col className="team-settings">
                                                            <Row>
                                                                <Col>
                                                                    <div className="bookmark-icon flex-shrink-0 me-2">
                                                                        <Rating
                                                                            stop={1}
                                                                            emptySymbol="mdi mdi-star-outline text-muted "
                                                                            fullSymbol="mdi mdi-star text-warning "
                                                                        />
                                                                        <Input type="checkbox" id="favourite1" className="bookmark-input bookmark-hide" />
                                                                        <Label htmlFor="favourite1" className="btn-star">
                                                                            <svg width="20" height="20">
                                                                                {/* <use xlink:href="#icon-star"/> */}
                                                                            </svg>
                                                                        </Label>

                                                                    </div>
                                                                </Col>
                                                                <UncontrolledDropdown direction='start' className="col text-end">
                                                                    <DropdownToggle tag="a" id="dropdownMenuLink2" role="button">
                                                                        <i className="ri-more-fill fs-17"></i>
                                                                    </DropdownToggle>
                                                                    <DropdownMenu>
                                                                        <DropdownItem><i className="ri-eye-line me-2 align-middle" />View</DropdownItem>
                                                                        <DropdownItem><i className="ri-star-line me-2 align-middle" />Favorites</DropdownItem>
                                                                        <DropdownItem onClick={() => onClickData(item)}><i className="ri-delete-bin-5-line me-2 align-middle" />Delete</DropdownItem>
                                                                    </DropdownMenu>
                                                                </UncontrolledDropdown>
                                                            </Row>
                                                        </Col>
                                                        <Col lg={4} className="col">
                                                            <div className="team-profile-img">

                                                                <div className="avatar-lg img-thumbnail rounded-circle flex-shrink-0">
                                                                    {item.userImage != null ?
                                                                        <img src={item.userImage} alt="" className="img-fluid d-block rounded-circle" />

                                                                        :
                                                                        <div className={"avatar-title rounded-circle bg-soft-" + item.bgColor + " text-" + item.textColor}>
                                                                            {item.name.charAt(0) + item.name.split(" ").slice(-1).toString().charAt(0)}
                                                                        </div>}
                                                                </div>
                                                                <div className="team-content">
                                                                    <Link to="#" onClick={() => { setIsOpen(!isOpen); setSideBar(item); }}><h5 className="fs-16 mb-1">{item.name}</h5></Link>
                                                                    <p className="text-muted mb-0">{item.designation}</p>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col lg={4} className="col">
                                                            <Row className="text-muted text-center">
                                                                <Col xs={6} className="border-end border-end-dashed">
                                                                    <h5 className="mb-1">{item.projectCount}</h5>
                                                                    <p className="text-muted mb-0">Projects</p>
                                                                </Col>
                                                                <Col xs={6}>
                                                                    <h5 className="mb-1">{item.taskCount}</h5>
                                                                    <p className="text-muted mb-0">Tasks</p>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg={2} className="col">
                                                            <div className="text-end">
                                                                <Link to="/pages-profile" className="btn btn-light view-btn">View Profile</Link>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    ))}

                                    <Col lg={12}>
                                        <div className="text-center mb-3">
                                            <Link to="#" className="text-success"><i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i> Load More </Link>
                                        </div>
                                    </Col>
                                </Row>


                                <div className="modal fade" id="addmembers" tabIndex="-1" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                    <Modal isOpen={modal} toggle={openModal} centered>
                                            <ModalHeader id="myModalLabel" toggle={openModal}>
                                                Add New Members
                                            </ModalHeader>
                                            <Form onSubmit={(e) => {
                                                e.preventDefault();
                                                validation.handleSubmit();
                                                openModal(!modal);
                                                return false;
                                            }}>
                                                <ModalBody>

                                                    <Row>
                                                        <Col lg={12}>
                                                            <div className="mb-3">
                                                                <Label htmlFor="teammembersName" className="form-label">Name</Label>
                                                                <Input type="text" className="form-control" id="teammembersName" placeholder="Enter name"
                                                                    name='name'
                                                                    validate={{
                                                                        required: { value: true },
                                                                    }}
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.name || ""}
                                                                    invalid={
                                                                        validation.touched.name && validation.errors.name ? true : false
                                                                    }
                                                                />
                                                                {validation.touched.name && validation.errors.name ? (
                                                                    <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <div className="mb-3">
                                                                <Label htmlFor="designation" className="form-label">Designation</Label>
                                                                <Input type="text" className="form-control" id="designation" placeholder="Enter designation" name='designation'
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.designation || ""}
                                                                    invalid={
                                                                        validation.touched.designation && validation.errors.designation ? true : false
                                                                    }
                                                                />
                                                                {validation.touched.designation && validation.errors.designation ? (
                                                                    <FormFeedback type="invalid">{validation.errors.designation}</FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <Label htmlFor="totalProjects" className="form-label">Projects</Label>
                                                                <Input type="number" className="form-control" id="totalProjects" placeholder="Total projects" name='projectCount'
                                                                    validate={{
                                                                        required: { value: true },
                                                                    }}
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.projectCount || ""}
                                                                    invalid={
                                                                        validation.touched.projectCount && validation.errors.projectCount ? true : false
                                                                    }
                                                                />
                                                                {validation.touched.projectCount && validation.errors.projectCount ? (
                                                                    <FormFeedback type="invalid">{validation.errors.projectCount}</FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <Label htmlFor="totalTasks" className="form-label">Tasks</Label>
                                                                <Input type="number" className="form-control" id="totalTasks" placeholder="Total tasks" name='taskCount'
                                                                    validate={{
                                                                        required: { value: true },
                                                                    }}
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.taskCount || ""}
                                                                    invalid={
                                                                        validation.touched.taskCount && validation.errors.taskCount ? true : false
                                                                    }
                                                                />
                                                                {validation.touched.taskCount && validation.errors.taskCount ? (
                                                                    <FormFeedback type="invalid">{validation.errors.taskCount}</FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <div className="mb-4">
                                                                <Label htmlFor="formFile" className="form-label">Profile Images</Label>
                                                                <Input className="form-control" type="file" id="formFile" />
                                                            </div>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <div className="hstack gap-2 justify-content-end">
                                                                <button type="button" className="btn btn-light" onClick={() => { setModal(false); }}>Close</button>
                                                                <button type="submit" className="btn btn-success">Add Member</button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </ModalBody>
                                            </Form>
                                        </Modal>
                                    </div>
                                </div>

                                <Offcanvas
                                    isOpen={isOpen}
                                    direction="end"
                                    toggle={() => setIsOpen(!isOpen)}
                                    className="offcanvas-end border-0"
                                    tabIndex="-1"
                                >
                                    <OffcanvasBody className="profile-offcanvas p-0">
                                        <div className="team-cover">
                                        <img src={sideBar.backgroundImg || smallImage9} alt="" className="img-fluid" />
                                        </div>
                                        <div className="p-3">
                                            <div className="team-settings">
                                                <Row>
                                                    <Col>
                                                        <div className="bookmark-icon flex-shrink-0 me-2">
                                                            <Input type="checkbox" id="favourite13" className="bookmark-input bookmark-hide" />
                                                            <Label htmlFor="favourite13" className="btn-star">
                                                                <svg width="20" height="20">
                                                                    {/* <use xlink:href="#icon-star"/> */}
                                                                </svg>
                                                            </Label>
                                                        </div>
                                                    </Col>
                                                    <UncontrolledDropdown direction='start' className="col text-end">
                                                        <DropdownToggle tag="a" id="dropdownMenuLink14" role="button">
                                                            <i className="ri-more-fill fs-17"></i>
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem><i className="ri-eye-line me-2 align-middle" />View</DropdownItem>
                                                            <DropdownItem><i className="ri-star-line me-2 align-middle" />Favorites</DropdownItem>
                                                            <DropdownItem><i className="ri-delete-bin-5-line me-2 align-middle" />Delete</DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </Row>
                                            </div>
                                        </div>
                                        <div className="p-3 text-center">
                                            <img src={sideBar.userImage || avatar2} alt="" className="avatar-lg img-thumbnail rounded-circle mx-auto" />
                                            <div className="mt-3">
                                                <h5 className="fs-15"><Link to="#" className="link-primary">{sideBar.name || "Nancy Martino"}</Link></h5>
                                                <p className="text-muted">{sideBar.designation || "Team Leader & HR"}</p>
                                            </div>
                                            <div className="hstack gap-2 justify-content-center mt-4">
                                                <div className="avatar-xs">
                                                    <Link to="#" className="avatar-title bg-soft-secondary text-secondary rounded fs-16">
                                                        <i className="ri-facebook-fill"></i>
                                                    </Link>
                                                </div>
                                                <div className="avatar-xs">
                                                    <Link to="#" className="avatar-title bg-soft-success text-success rounded fs-16">
                                                        <i className="ri-slack-fill"></i>
                                                    </Link>
                                                </div>
                                                <div className="avatar-xs">
                                                    <Link to="#" className="avatar-title bg-soft-info text-info rounded fs-16">
                                                        <i className="ri-linkedin-fill"></i>
                                                    </Link>
                                                </div>
                                                <div className="avatar-xs">
                                                    <Link to="#" className="avatar-title bg-soft-danger text-danger rounded fs-16">
                                                        <i className="ri-dribbble-fill"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <Row className="g-0 text-center">
                                            <Col xs={6}>
                                                <div className="p-3 border border-dashed border-start-0">
                                                    <h5 className="mb-1">{sideBar.projectCount || "124"}</h5>
                                                    <p className="text-muted mb-0">Projects</p>
                                                </div>
                                            </Col>
                                            <Col xs={6}>
                                                <div className="p-3 border border-dashed border-start-0">
                                                    <h5 className="mb-1">{sideBar.taskCount || "81"}</h5>
                                                    <p className="text-muted mb-0">Tasks</p>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="p-3">
                                            <h5 className="fs-15 mb-3">Personal Details</h5>
                                            <div className="mb-3">
                                                <p className="text-muted text-uppercase fw-semibold fs-12 mb-2">Number</p>
                                                <h6>+(256) 2451 8974</h6>
                                            </div>
                                            <div className="mb-3">
                                                <p className="text-muted text-uppercase fw-semibold fs-12 mb-2">Email</p>
                                                <h6>nancymartino@email.com</h6>
                                            </div>
                                            <div>
                                                <p className="text-muted text-uppercase fw-semibold fs-12 mb-2">Location</p>
                                                <h6 className="mb-0">Carson City - USA</h6>
                                            </div>
                                        </div>
                                        <div className="p-3 border-top">
                                            <h5 className="fs-15 mb-4">File Manager</h5>
                                            <div className="d-flex mb-3">
                                                <div className="flex-shrink-0 avatar-xs">
                                                    <div className="avatar-title bg-soft-danger text-danger rounded fs-16">
                                                        <i className="ri-image-2-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1"><Link to="#">Images</Link></h6>
                                                    <p className="text-muted mb-0">4469 Files</p>
                                                </div>
                                                <div className="text-muted">
                                                    12 GB
                                                </div>
                                            </div>
                                            <div className="d-flex mb-3">
                                                <div className="flex-shrink-0 avatar-xs">
                                                    <div className="avatar-title bg-soft-secondary text-secondary rounded fs-16">
                                                        <i className="ri-file-zip-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1"><Link to="#">Documents</Link></h6>
                                                    <p className="text-muted mb-0">46 Files</p>
                                                </div>
                                                <div className="text-muted">
                                                    3.46 GB
                                                </div>
                                            </div>
                                            <div className="d-flex mb-3">
                                                <div className="flex-shrink-0 avatar-xs">
                                                    <div className="avatar-title bg-soft-success text-success rounded fs-16">
                                                        <i className="ri-live-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1"><Link to="#">Media</Link></h6>
                                                    <p className="text-muted mb-0">124 Files</p>
                                                </div>
                                                <div className="text-muted">
                                                    4.3 GB
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 avatar-xs">
                                                    <div className="avatar-title bg-soft-primary text-primary rounded fs-16">
                                                        <i className="ri-error-warning-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1"><Link to="#">Others</Link></h6>
                                                    <p className="text-muted mb-0">18 Files</p>
                                                </div>
                                                <div className="text-muted">
                                                    846 MB
                                                </div>
                                            </div>
                                        </div>
                                    </OffcanvasBody>
                                    <div className="offcanvas-foorter border p-3 hstack gap-3 text-center position-relative">
                                        <button className="btn btn-light w-100"><i className="ri-question-answer-fill align-bottom ms-1"></i> Send Message</button>
                                        <Link to="/pages-profile" className="btn btn-primary w-100"><i className="ri-user-3-fill align-bottom ms-1"></i> View Profile</Link>
                                    </div>
                                </Offcanvas>
                            </div>
                        </Col>
                    </Row>

                    <svg className="bookmark-hide">
                        <symbol viewBox="0 0 24 24" stroke="currentColor" fill="var(--color-svg)" id="icon-star"><path strokeWidth=".4" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></symbol>
                    </svg>

                </Container>
            </div>
        </React.Fragment>
    );
};

export default Team;