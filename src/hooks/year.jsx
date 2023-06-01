import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { YEAR_DETAIL, YEAR_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';
import { PAGE_SIZE } from '../constants';

export const useYearList = (tableParams) => {
    var sort, sortColumn, limit, page, search;
    if (tableParams !== undefined) {
        sort = tableParams.sorter?.sort || 'desc'
        sortColumn = tableParams.sorter?.sortColumn || 'id'
        limit = tableParams.sorter?.pageSize || PAGE_SIZE
        page = tableParams.sorter?.current || 1
        search = tableParams.search
    }

    return useQuery([YEAR_LIST, sort, sortColumn, limit, page, search], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.YEAR.LIST}`,
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

export const useYearDetail = (yearId) => {
    return useQuery([YEAR_DETAIL, yearId], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.YEAR.UPDATE}`.replace(':id', yearId))

        return data;
    })
}

export const useYearDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (yearId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.YEAR.UPDATE.replace(":id", yearId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(YEAR_LIST);
            },
        }
    );
};

export const useCreateYear = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.YEAR.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(YEAR_LIST);
            },
        }
    );
};

export const useUpdateYear = (yearId) => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.put(`${API.API_ROOT}${API.YEAR.UPDATE.replace(':id', yearId)}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(YEAR_LIST);
            },
        }
    );
};