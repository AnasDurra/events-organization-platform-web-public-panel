import { useCallback, useEffect, useRef } from 'react';

export const InfiniteScroll = ({ load, hasMore, loader, children, endMessage }) => {
    const sentinelRef = useRef();
    const observerRef = useRef();

    const handleIntersect = useCallback(
        (entries, observer) => {
            // Check if the sentinel element is intersecting, and if so, call the load function
            if (entries[0].isIntersecting && hasMore) {
                load();
            }
        },
        [load]
    );

    useEffect(() => {
        // Create a new IntersectionObserver when the component mounts
        observerRef.current = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        });

        // Attach the observer to the sentinel element
        if (sentinelRef.current) {
            observerRef.current.observe(sentinelRef.current);
        }

        // Clean up the observer when the component unmounts
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [load]);

    useEffect(() => {
        // When the hasMore prop changes, disconnect the previous observer and reattach it to the new sentinel element
        if (observerRef.current && sentinelRef.current) {
            observerRef.current.disconnect();
            observerRef.current.observe(sentinelRef.current);
        }
    }, [hasMore]);

    return (
        <div>
            {children}
            <div ref={sentinelRef}>{hasMore && loader}</div>
            {!hasMore && endMessage}
        </div>
    );
};
