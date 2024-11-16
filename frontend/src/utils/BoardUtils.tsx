
import { useRecoilState } from 'recoil';
import { tasksState } from '../atom';
import instance from '../axios/axios';
import { Task } from '../components/PersonalBoard';

export const useBoardState = () => {
    const [groupedTasks, setGroupedTasks] = useRecoilState(tasksState);

    const fetchBoard = async () => {
        try {
            const response = await instance.get('/api/v1/tasks');
            const tasks = response.data.tasks;

            const grouped = tasks.reduce((acc: { [key: string]: Task[] }, task: Task) => {
               
                acc[task.status].push(task);
                return acc;
            }, {
                todo: [],
                in_progress: [],
                under_review: [],
                finished: []
            });

            setGroupedTasks(grouped);
        } catch (error) {
            console.error('Error fetching personal board:', error);
        }
    };

    return { fetchBoard, groupedTasks, setGroupedTasks };
};
