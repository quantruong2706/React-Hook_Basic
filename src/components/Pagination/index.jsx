import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPagechange: PropTypes.func,
};
Pagination.defaultProps = {
    onPagechange: null,
}



function Pagination(props) {
    const { pagination, onPagechange } = props;
    const { _page, _limit, _totalRows } = pagination;
    const totalPages = Math.ceil(_totalRows / _limit);
    function handlePageChange(newPage) {
        if (onPagechange) {
            onPagechange(newPage);
        }
    }
    return (
        <div>
            <button
                disabled={_page <= 1}
                onClick={() => handlePageChange(_page - 1)}
            >Prev</button>
            <button
                disabled={_page >= totalPages}
                onClick={() => handlePageChange(_page + 1)}
            >Prev</button>
        </div>
    );
}

export default Pagination;