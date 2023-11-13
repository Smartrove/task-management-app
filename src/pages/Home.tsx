import React, { useEffect } from 'react'
import { useCreateTaskMutation, useGetAllTasksQuery } from '../redux/api/apiSlice'
import { Container, FormContainer } from './Login';
import styled from 'styled-components';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from 'react-router-dom';
import { validateFirstName, validateLastName, validateUsername } from '../service/MenuValidationService';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { getAllTasks } from '../redux/features/tasks/taskSlice';
import TaskCard from '../component/taskCard/TaskCard';



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: 300,
    sm: 500,
    md: 700,
    xl: 750,
    lg: 750,
  },
  height: 700,
  bgcolor: "#FAFAFA",
  boxShadow: 24,
  p: 4,
};

interface ClickHandler {
  (event: MouseEvent): void;
}

const Home: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [description, setDescription] = React.useState("");
  const [duedate, setDueDate] = React.useState("");

  const {user, token } = useSelector((state: RootState) => state.auth )
  console.log("user>>>", user, typeof token)

  const handleOpen = () => {

    if(!user){
      navigate('/login')
    }
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

    const {data, error, isLoading} = useGetAllTasksQuery('title')
    const [createTask, {error: isCreateError, isLoading: isCreateLoading}] = useCreateTaskMutation()
  const navigate = useNavigate();
  const dispatch = useDispatch();


    const handleSubmit: ClickHandler = async (event) => {
      event.preventDefault();
      let validationFailed = false;
  
      // ... (other validation and setup code)
      if (!validateFirstName(title)) {
        toast.error("title field is a compulsory field");
        validationFailed = true;
      }
      if (!validateLastName(description)) {
        toast.error("description field is a compulsory field");
        validationFailed = true;
      }
      if (!validateUsername(priority)) {
        toast.error("priority field is a compulsory field");
        validationFailed = true;
      }
  
      if (validationFailed) {
        return; // Stop form submission if validation failed
      }
  
      try {
          const data = {
            title,
            description,
            priority,
            duedate
          };
  
          const response = await createTask(data).unwrap();

          if (response) {
            toast.success("Task created successfully");
            setTitle("");
            setPriority("");
            setDescription("");
            setDueDate('')
            handleClose();
            navigate("/");
  
          }
        }
       catch (err) {
        if (err instanceof Error && err.message) {
          toast.error(err.message);
        } else {
          // Handle other cases or log the unknown error
          console.error('Unknown error:', err);
        }
      } 
    };

    useEffect(()=>{
      !isLoading && data && dispatch(getAllTasks(data.results))
   },  [data] )

  return (
    <>
    <Container>
      <FormContainer>
        <FormBox>
          <CreateButtonWrapper>
            <CreateButton onClick={handleOpen}>Create Task</CreateButton>
          </CreateButtonWrapper>
          <TaskCard/>
          {/* {!isLoading && data &&  <TaskCard data={data} />} */}
        </FormBox>
      </FormContainer>
        
    </Container>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ContentWrapper>
            <AddMenuHeader>Create Task</AddMenuHeader>
            <br />
            <form onSubmit={handleSubmit}>
              <RowOneWrapper>
                <CategoryWrapper>
                  <Label htmlFor="title" style={{ marginBottom: "1rem" }}>
                    Title
                  </Label>
                  <br />
                  <br />
                  <input
                    type="text"
                    placeholder="enter task title"
                    id="name"
                    name="name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </CategoryWrapper>
              </RowOneWrapper>
              <br />
              <RowOneWrapper>
                <CategoryWrapper>
                  <Label htmlFor="description" style={{ marginBottom: "1rem" }}>
                    Description
                  </Label>
                  <br />
                  <input
                    type="text"
                    placeholder="enter a description"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    // required
                  />
                </CategoryWrapper>
              </RowOneWrapper>
              <br />
              <RowOneWrapper>
                <CategoryWrapper>
                  <Label htmlFor="priority" style={{ marginBottom: "1rem" }}>
                    Priority
                  </Label>
                  <br />
                  <input
                    type="text"
                    placeholder="enter a priority"
                    id="priority"
                    name="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    // required
                  />
                </CategoryWrapper>
              </RowOneWrapper>
              <br />
              <RowOneWrapper>
                <CategoryWrapper>
                  <Label htmlFor="duedate" style={{ marginBottom: "1rem" }}>
                    Due Date
                  </Label>
                  <br />
                  <input
                    type="date"
                    placeholder="enter a due date"
                    id="duedate"
                    name="duedate"
                    value={duedate}
                    onChange={(e) => setDueDate(e.target.value)}
                    // required
                  />
                </CategoryWrapper>
              </RowOneWrapper>
              <br />

              <CreateMenuBtnWrapper>
                <CancelButton onClick={handleClose}>Cancel</CancelButton>
                {isCreateLoading ? (
                  <>
                    <div>
                      <CreateButton>
                        <span>
                          <CircularProgress
                            style={{ color: "white" }}
                          />
                        </span>
                      </CreateButton>
                    </div>
                  </>
                ) : (
                  <CreateButton>Create Task</CreateButton>
                )}
              </CreateMenuBtnWrapper>
            </form>
          </ContentWrapper>
        </Box>
      </Modal>
          </>
  )
}

export default Home

const Label = styled.label`
  color:#9BBEC8
`

const CreateButtonWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
position: relative;
margin-right: -450px;
`

const CreateButton = styled.button`
  border: none;
  background-color: #427D9D;
  color: #fff;
  font-family: Inter;
  padding: 12px;
  cursor: pointer;
`



 const FormBox = styled.div`
  width: 700px;
  background-color: #fff;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 45px;
  gap: 0;
  img {
    margin-bottom: 30px;
  }
`;

const CategoryWrapper = styled.div`
  width: 100%;

  input {
    width: 100%;
    height: 50px;
    padding: 8px 12px;
    align-items: center;
    gap: 12px;
    border-radius: 6px;
    border: 1px solid #e5e5e5;
    background: #fff;
  }
`;


const CancelButton = styled.button`
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  background: #427D9D;
  padding: 12px;
  cursor: pointer;
`;
const CreateMenuBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 10px;
  background: #9BBEC8;
`;




const AddMenuHeader = styled.h2`
  margin-top: -25px;
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
  gap: 0.5rem;
  color: #171717;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
`;

const RowOneWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  margin-right: 20px;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
`;
