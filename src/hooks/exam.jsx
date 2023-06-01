import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EXAM_DETAIL, EXAM_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';
import { PAGE_SIZE } from '../constants';

export const useExamList = (tableParams) => {
    var sort, sortColumn, limit, page, search;
    if (tableParams !== undefined) {
        sort = tableParams.sorter?.sort || 'desc'
        sortColumn = tableParams.sorter?.sortColumn || 'id'
        limit = tableParams.sorter?.pageSize || PAGE_SIZE
        page = tableParams.sorter?.current || 1
        search = tableParams.search
    }

    return useQuery([EXAM_LIST, sort, sortColumn, limit, page, search], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.EXAM.LIST}`,
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

export const useExamDetail = (examId) => {
    return useQuery([EXAM_DETAIL,examId], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.EXAM.UPDATE}`.replace(':id', examId))

        return data;
    })
}

export const useExamDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (examId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.EXAM.UPDATE.replace(":id", examId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(EXAM_LIST);
            },
        }
    );
};

export const useCreateExam = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.EXAM.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(EXAM_LIST);
            },
        }
    );
};

export const useUpdateExam = (examId) => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.put(`${API.API_ROOT}${API.EXAM.UPDATE.replace(':id', examId)}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(EXAM_LIST);
            },
        }
    );
};