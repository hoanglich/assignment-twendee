import { PayloadAction, createSlice} from "@reduxjs/toolkit";
interface AssignmentState {
    AssignmentArr: any[];
    AssignmentPage: number;
    currentPage: number;
}


interface SortDataPayLoad {
    payload: "fullname"|"username";
}

interface RootState {
    AssignmentStore: AssignmentState;
}

export const AssignmentSlice = createSlice({
    name: 'Assignment',
    initialState: {
        AssignmentArr: [],
        AssignmentPage: 10,
        currentPage: 1,
    } as AssignmentState,
    reducers: {
        fetchData: (state, action:{
            payload: any[];
        })=>{
            const data: any[] = action.payload;
            state.AssignmentArr = [...data];
        },
        onSortData: (state, action: PayloadAction<SortDataPayLoad>)=>{
            const {payload} = action.payload
            const sortUsers = (users: any[], sortBy: 'fullname' | 'username')=>{
                const sortedUsers = [...users];
                sortedUsers.sort((a,b)=>{

                    if (sortBy=== 'fullname')
                    {
                        return a.name.first.localeCompare(b.name.first)
                    }
                    else if (sortBy==='username') {
                        return a.login.username.localeCompare(b.login.username)
                    }
                })
            
                state.AssignmentArr= [...sortedUsers]
            }

            sortUsers(state.AssignmentArr, payload  )
            console.log('arr sorted', state.AssignmentArr)
        },

        onNextPage: (state)=>{
            state.currentPage++;
        },
        onPrevPage: (state)=>{
            state.currentPage--;
        },
        onclickCurrentPage: (state,action: PayloadAction<number>)=>{
            state.currentPage = action.payload;

        },
    },

});

export  const AssignmentAction = AssignmentSlice.actions
export type{AssignmentState, SortDataPayLoad,RootState}