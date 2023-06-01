import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { STAFF_DETAIL, STAFF_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';
import { PAGE_SIZE } from '../constants';

export const useStaffList = (tableParams) => {
    var sort, sortColumn, limit, page, search;
    if (tableParams !== undefined) {
        sort = tableParams.sorter?.sort || 'desc'
        sortColumn = tableParams.sorter?.sortColumn || 'id'
        limit = tableParams.sorter?.pageSize || PAGE_SIZE
        page = tableParams.sorter?.current || 1
        search = tableParams.search
    }

    return useQuery([STAFF_LIST, sort, sortColumn, limit, page, search], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.STAFF.LIST}`,
            {
                params: {
                    sort: sort,
                    sortColumn: sortColumn,
                    limit: limit,
                    search,
                    offset: page == 1 ? page - 1 : page
                },
            })

        return { data, total: headers["x-total-count"] };
    })
}

export const useStaffDetail = (staffId) => {
    return useQuery([STAFF_DETAIL,staffId], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.STAFF.UPDATE}`.replace(':id', staffId))

        return data;
    })
}

export const useStaffDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (staffId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.STAFF.UPDATE.replace(":id", staffId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(STAFF_LIST);
            },
        }
    );
};

export const useCreateStaff = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            const res = await axios.post(`${API.API_ROOT}${API.STAFF.LIST}`, data);

            return {data: res?.data}
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(STAFF_LIST);
            },
        }
    );
};

export const useUpdateStaff = (staffId) => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.put(`${API.API_ROOT}${API.STAFF.UPDATE}`.replace(':id', staffId), data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(STAFF_LIST);
            },
        }
    );
};