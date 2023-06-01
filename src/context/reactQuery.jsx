import { useState } from "react";
import PropTypes from "prop-types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { DEBUG } from '@/constants'

const RQ_DEFAULT_QUERIES_OPTIONS = {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
};

const ReactQueryProvider = ({ children }) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: RQ_DEFAULT_QUERIES_OPTIONS,
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            <>{children}</>
            {/* {DEBUG && <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />} */}
        </QueryClientProvider>
    );
};

ReactQueryProvider.propTypes = {
    children: PropTypes.any,
};

export { RQ_DEFAULT_QUERIES_OPTIONS, ReactQueryProvider };
