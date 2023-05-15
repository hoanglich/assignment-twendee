import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AssignmentAction ,AssignmentSlice, AssignmentState, SortDataPayLoad, RootState } from './redux/assignmentSlice';
import axios, { AxiosResponse } from 'axios';
import { image } from './access/image';

function App() {
  const dispatch = useDispatch();
  const AssignmentArr = useSelector((state :RootState) => state.AssignmentStore.AssignmentArr );
  const AssignmentPage = useSelector((state :RootState) => state.AssignmentStore.AssignmentPage );
  const currentPage = useSelector((state :RootState) => state.AssignmentStore.currentPage );
  useEffect(() => {
    const fetchDataApi = async () => {
      try {
        console.log('effect', currentPage)
        const response: AxiosResponse = await axios.get(`https://randomuser.me/api/?page=${currentPage}&results=100`);
        dispatch(AssignmentSlice.actions.fetchData(response.data.results));
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataApi();
  }, [dispatch, currentPage]);
  
  // pagination
  const totalPage = Math.ceil(AssignmentArr?.length / AssignmentPage);
  const pages = totalPage && totalPage > 0 ? [...Array(totalPage + 1).keys()].slice(1): [];
  const indexOflastPage = currentPage * AssignmentPage;
  const indexOfFirstPage = indexOflastPage - AssignmentPage;

  const visibleAssignment = AssignmentArr?.slice(indexOfFirstPage,indexOflastPage)

  console.log(AssignmentArr)
  // handle button
  const PrevPage = ()=>{
    if(currentPage !==1){
      dispatch(AssignmentAction.onPrevPage())
      
    }
  }
  const nextPage = ()=>{
    if(currentPage !==totalPage){
      dispatch(AssignmentAction.onNextPage())
    }
  }

  const handleSort = (field:string) => {
    const payload: SortDataPayLoad = { payload: field as "fullname" | "username" };
    dispatch(AssignmentSlice.actions.onSortData(payload))
  }

  const handleClick=(index:number)=>{
    dispatch(AssignmentSlice.actions.onclickCurrentPage(index))
  }

  if(AssignmentArr?.length===0){
    return <div className='loading'> 
      <img src={image.loading} alt='loading'/>
    </div>
  }
  else{
    return (
      <div className="App">
        <ul className='pagination'>
          <span  onClick={PrevPage} className='pagination-btn'>
            Prev
          </span>
          {pages.map((page,index)=>{
            return <li 
              key={index} 
              className={index +1 ===currentPage ? 'pagination-item active' : 'pagination-item'} 
              onClick={()=>handleClick(index+1)}
            >
              {page}
            </li>
          })}
          <span onClick={nextPage} className='pagination-btn'>
            Next
          </span>
          <span className='pagination-btn' onClick={() => handleSort('fullname')}>
            Sort by full name
          </span>

          <span className='pagination-btn' onClick={() => handleSort('username')}>
            Sort by user name
          </span>
        </ul>
        <div className='wrap-list-user'>
          {visibleAssignment?.map((Assignment: any, index: number)=>{
            return <section key={index} className='list-user_item'>
              <img className="image-thumbanail" alt="image-thumbanail" src={Assignment.picture.thumbnail}  />
              <div className='wrap-name'>
                <div className='full-name'>
                    <span className='name'>Full Name:</span> {Assignment.name.title}. {Assignment.name.first} {Assignment.name.last}
                </div>
                <div className='user-name'>
                  <span className='name'>User Name:</span> {Assignment.login.username}
                </div>
              </div>
              
            </section>
          })}
        </div>
      
        <footer className='footer'>
          Page {currentPage} or {totalPage}
        </footer>
      </div>
    );
  }
  
}

export default App;
