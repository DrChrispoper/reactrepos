import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import { RouteComponentProps } from 'react-router-dom';
import {
  useReposQuery,
  useMoreReposLazyQuery,
  Repository,
} from '../../../generated/graphql';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

interface repoInterface
  extends Pick<
    Repository,
    'name' | 'url' | 'id' | 'forkCount' | 'stargazerCount'
  > {}

const ReposTable: React.FC<RouteComponentProps<any>> = () => {
  const { data, loading, error } = useReposQuery();

  const [totalSize, setTotalSize] = useState(0);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [repoRecords, setRepoRecords] = useState<repoInterface[]>([]);

  const [getMoreRepos, { data: additionalData }] = useMoreReposLazyQuery({
    variables: {
      _cursor: cursor,
    },
  });

  useEffect(() => {
    if (data) {
      setTotalSize(data.search.repositoryCount);
      const repos: repoInterface[] = [];
      data.search.nodes.forEach(repo => {
        repos.push(repo);
      });
      setCursor(data.search.pageInfo.endCursor);
      setRepoRecords(repos);
      getMoreRepos();
    }
  }, [data]);

  useEffect(() => {
    if (additionalData) {
      console.log('additional data fetched');

      const repos: repoInterface[] = [];
      additionalData.search.nodes.forEach(repo => {
        repos.push(repo);
      });
      setRepoRecords(prev => [...prev, ...repos]);
    }
  }, [additionalData]);

  const nameFormater = (cell: any, row: repoInterface) => {
    return <a href={row.url} target="blank">{`${cell}`}</a>;
  };

  const forkFormater = (cell: any) => {
    return <>{`🍴 ${cell}`}</>;
  };

  const starFormater = (cell: any) => {
    return <>{`⭐ ${cell}`}</>;
  };

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      hidden: true,
    },
    {
      dataField: 'name',
      text: 'Name',
      formatter: nameFormater,
      filter: textFilter(),
    },
    {
      dataField: 'forkCount',
      text: 'Forks',
      sort: true,
      formatter: forkFormater,
    },
    {
      dataField: 'stargazerCount',
      text: 'Stars',
      sort: true,
      formatter: starFormater,
    },
  ];

  const options = {
    totalSize,
    onPageChange: (page: number, sizePerPage: number) => {
      if (page * sizePerPage == repoRecords.length) {
        if (additionalData) {
          setCursor(additionalData.search.pageInfo.endCursor);
        }
      }
    },
    withFirstAndLast: false,
    hideSizePerPage: true,
    prePageText: 'Back',
    nextPageText: 'Next',
    showTotal: true,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: '10',
        value: 10,
      },
    ],
  };

  return (
    <>
      {repoRecords ? (
        <ToolkitProvider keyField="id" data={repoRecords} columns={columns}>
          {props => (
            <div>
              <Card className="mb-5 mt-5 sensor-record-card">
                <CardBody>
                  <BootstrapTable
                    pagination={paginationFactory(options)}
                    bordered={false}
                    filter={filterFactory()}
                    // eslint-disable-next-line react/prop-types
                    {...props.baseProps}
                  />
                </CardBody>
              </Card>
            </div>
          )}
        </ToolkitProvider>
      ) : (
        <>
          <h2>Loading Repositories...</h2>
          <div className="loading" />
        </>
      )}
    </>
  );
};

export default ReposTable;
