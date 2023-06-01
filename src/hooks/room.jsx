import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ROOM_DETAIL, ROOM_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';
import { PAGE_SIZE } from '../constants';

export const useRoomList = (tableParams) => {
    var sort, sortColumn, limit, page, search;
    if (tableParams !== undefined) {
        sort = tableParams.sorter?.sort || 'desc'
        sortColumn = tableParams.sorter?.sortColumn || 'id'
        limit = tableParams.sorter?.pageSize || PAGE_SIZE
        page = tableParams.sorter?.current || 1
        search = tableParams.search
    }

    return useQuery([ROOM_LIST, sort, sortColumn, limit, page, search], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.ROOM.LIST}`,
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

export const useRoomDetail = (roomId) => {
    return useQuery([ROOM_DETAIL,roomId], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.ROOM.UPDATE}`.replace(':id', roomId))

        return data;
    })
}

export const useRoomDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (roomId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.ROOM.UPDATE.replace(":id", roomId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(ROOM_LIST);
            },
        }
    );
};

export const useCreateRoom = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.ROOM.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(ROOM_LIST);
            },
        }
    );
};

export const useUpdateRoom = (roomId) => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.put(`${API.API_ROOT}${API.ROOM.UPDATE.replace(':id', roomId)}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(ROOM_LIST);
            },
        }
    );
};