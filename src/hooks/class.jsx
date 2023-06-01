import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CLASS_DASHBOARD, CLASS_DETAIL, CLASS_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';
import { PAGE_SIZE } from '../constants';

export const useClassList = (tableParams) => {
    var sort, sortColumn, limit, page, search, userId;
    if (tableParams !== undefined) {
        sort = tableParams.sorter?.sort || 'desc'
        sortColumn = tableParams.sorter?.sortColumn || 'id'
        limit = tableParams.sorter?.pageSize || PAGE_SIZE
        page = tableParams.sorter?.current || 1
        search = tableParams.search
        userId = tableParams.userId
    }

    return useQuery([CLASS_LIST, sort, sortColumn, limit, page, search, userId], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.CLASS.LIST}`,
            {
                params: {
                    sort: sort,
                    sortColumn: sortColumn,
                    limit: limit,
                    user_id: userId,
                    search,
                    offset: page == 1 ? page - 1 : page
                },
            })

        return { data, total: headers["x-total-count"] };
    })
}

export const useClassDashboard = ({ userId, yearId }) => {
    return useQuery([CLASS_DASHBOARD, userId, yearId], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.CLASS.DASHBOARD}`,
            {
                params: {
                    year_id: yearId,
                    user_id: userId,
                },
            })

        return { data, total: headers["x-total-count"] };
    })
}

export const useClassDetail = (classId) => {
    return useQuery([CLASS_DETAIL, classId], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.CLASS.UPDATE}`.replace(':id', classId))

        return data;
    })
}

export const useClassDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (classId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.CLASS.UPDATE.replace(":id", classId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(CLASS_LIST);
            },
        }
    );
};

export const useCreateClass = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.CLASS.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(CLASS_LIST);
            },
        }
    );
};

export const useUpdateClass = (classId) => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.put(`${API.API_ROOT}${API.CLASS.UPDATE.replace(':id', classId)}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(CLASS_LIST);
            },
        }
    );
};