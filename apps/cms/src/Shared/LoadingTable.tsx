import React from 'react';
import Shimmer from './UI/Shimmer';

function LoadingCell({
  className,
  width
}: {
  className?: string;
  width?: number;
}) {
  return (
    <td className={className}>
      <Shimmer>
        <div
          style={{
            height: '10px',
            marginTop: '10px',
            width: width ? `${width}px` : '50px'
          }}
        ></div>
      </Shimmer>
    </td>
  );
}

function LoadingTable() {
  return (
    <table className="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th style={{ paddingLeft: '0' }}>
            <Shimmer>
              <div
                style={{
                  height: '10px',
                  marginTop: '10px',
                  width: '80px'
                }}
              ></div>
            </Shimmer>
          </th>
          <th className="has-text-centered">
            <Shimmer>
              <div
                style={{
                  height: '10px',
                  marginTop: '10px',
                  width: '80px'
                }}
              ></div>
            </Shimmer>
          </th>
          <th className="has-text-centered">
            <Shimmer>
              <div
                style={{
                  height: '10px',
                  marginTop: '10px',
                  width: '70px'
                }}
              ></div>
            </Shimmer>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <LoadingCell width={120} />
          <LoadingCell className="has-text-centered" width={60} />
          <LoadingCell className="has-text-centered" width={70} />
        </tr>

        <tr>
          <LoadingCell width={100} />
          <LoadingCell className="has-text-centered" width={60} />
          <LoadingCell className="has-text-centered" width={50} />
        </tr>

        <tr>
          <LoadingCell width={110} />
          <LoadingCell className="has-text-centered" width={70} />
          <LoadingCell className="has-text-centered" width={50} />
        </tr>

        <tr>
          <LoadingCell width={120} />
          <LoadingCell className="has-text-centered" width={60} />
          <LoadingCell className="has-text-centered" width={70} />
        </tr>

        <tr>
          <LoadingCell width={100} />
          <LoadingCell className="has-text-centered" width={60} />
          <LoadingCell className="has-text-centered" width={50} />
        </tr>
      </tbody>
    </table>
  );
}

export default LoadingTable;
