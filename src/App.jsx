import "./App.css";
import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: [],
    });

    function handleAddTask(text) {
        setProjectsState((preState) => {
            const newTask = {
                text: text,
                projectId: preState.selectedProjectId,
                id: Math.random(),
            };

            return {
                ...preState,
                tasks: [newTask, ...preState.tasks],
            };
        });
    }

    function handleDeleteTask(id) {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter((task) => task.id !== id),
            };
        });
    }

    function handleStartAddProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: null,
            };
        });
    }

    function handleCancelAddProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
            };
        });
    }

    function handleAddProject(projectData) {
        setProjectsState((preState) => {
            const newProject = {
                ...projectData,
                id: Math.random(),
            };

            return {
                ...preState,
                selectedProjectId: undefined,
                projects: [...preState.projects, newProject],
            };
        });
    }

    function handleDeleteProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: prevState.projects.filter(
                    (project) => project.id !== prevState.selectedProjectId
                ),
            };
        });
    }

    function handleSelectProject(id) {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: id,
            };
        });
    }

    const selectedProject = projectsState.projects.find(
        (project) => project.id === projectsState.selectedProjectId
    );

    let content = (
        <SelectedProject
            project={selectedProject}
            onDelete={handleDeleteProject}
            onAddTask={handleAddTask}
            tasks={projectsState.tasks}
            onDeleteTask={handleDeleteTask}
        />
    );

    if (projectsState.selectedProjectId === null) {
        content = (
            <NewProject
                onAdd={handleAddProject}
                onCancel={handleCancelAddProject}
            />
        );
    } else if (projectsState.selectedProjectId === undefined) {
        content = (
            <NoProjectSelected onStartAddProject={handleStartAddProject} />
        );
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSidebar
                onStartAddProject={handleStartAddProject}
                projects={projectsState.projects}
                onSelectProject={handleSelectProject}
                selectedProjectId={projectsState.selectedProjectId}
            />
            {content}
        </main>
    );
}

export default App;
