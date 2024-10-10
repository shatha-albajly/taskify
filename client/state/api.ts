import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// create a project type

export interface Project  {     
    id: number;
    name: string;   
    description?: string;
    startDate?: string;
    endDate?: string;
}

export enum Status {
    "TODO" = "TODO",
    "IN_PROGRESS" = "IN_PROGRESS",
    "IN_REVIEW" = "IN_REVIEW",
    "COMPLETED" = "COMPLETED"
}

export enum Priority{
    "LOW" = "LOW",
    "MEDIUM" = "MEDIUM",
    "HIGH" = "HIGH",
    "URGENT" = "URGENT",
    "BACKLOG" = "BACKLOG"
}

export interface User {
    userId?: number;
    username: string;
    email: string;
    profilePictureUrl?: string;
    cognitoId?: string;
    teamId?: number;
  }
  
  export interface Attachment {
    id: number;
    fileURL: string;
    fileName: string;
    taskId: number;
    uploadedById: number;
  }


export interface Task{
    id: number;
    title: string;
    description?: string;
    dueDate?: string;
    status?: Status;
    priority?: Priority;
    projectId?: number;
    assignedUserId?: number;
    authorUserId?: number;
    tags?: string;
    startDate?: string;
    points?: number;
    author?: User;
    assignee?: User;
    comments?: Comment[];
    attachments?: Attachment[];

}
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["Projects","Tasks"],
    endpoints: (build) => ({
        getProjects: build.query<Project[], void>({
            query: () => "projects",
            providesTags: ["Projects"],
        }),

        createProject: build.mutation<Project, Partial<Project>>({
            query: (project) => ({
                url: "projects",
                method: "POST",
                body: project,
            }),
            invalidatesTags: ["Projects"],
        }),
        getTasks: build.query<Task[], number>({
            query: (projectId) => ({
                url: `tasks?projectId=${projectId}`,
                providesTags(result: Task[]) {
                    result? result.map(({id})=>({type: "Tasks" as const, id})):
                     [{type : "Tasks" as const}]
                    
                }

            }),
        }),
        createTask: build.mutation<Task, Partial<Task>>({
            query: (task) => ({ 
                url: "tasks",
                method: "POST",
                body: task,
        }),
        invalidatesTags: ["Tasks"],
    }),
    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
        query: ({ taskId, status }) => ({
            url: `tasks/${taskId}/status`,
            method: "PATCH",
            body: { status },
        }),
        invalidatesTags: (result, error, { taskId }) => {
            return [{ type: "Tasks", id: taskId }];
        },
    })
    }),
});
export const { 
    useGetProjectsQuery, 
    useCreateProjectMutation, 
    useGetTasksQuery, 
    useCreateTaskMutation, 
    useUpdateTaskStatusMutation 
} = api;