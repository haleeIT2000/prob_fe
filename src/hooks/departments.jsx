import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DEPARTMENT_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';

export const useDepartmentList = () => {
    return useQuery([DEPARTMENT_LIST], async () => {
        const { data, headers } = await axios.get(`${API.API_ROOT}${API.DEPARTMENT.LIST}`)
        
        return { data, total: headers["x-total-count"] };
    })
}

export const useCreateDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.DEPARTMENT.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(DEPARTMENT_LIST);
            },
        }
    );
};
export const useDepartmentDetail = (departmentId) => {
    return useQuery([Department_DETAIL,departmentId], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.DEPARTMENT.UPDATE}`.replace(':id', departmentId))

        return data;
    })
}