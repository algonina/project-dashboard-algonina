export const defaulsizePerPageList = [
  { text: '3', value: 3 },
  { text: '5', value: 5 },
  { text: '10', value: 10 },
  { text: '25', value: 25 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
];

export const defaultShoted = [{ defaultFiled: 'id', order: 'asc' }];

export function NoRecordsFoundMessage({ entities, loading }) {
  const customersList = entities === null ? [] : entities;
  return (
    <div>
      {customersList.length === 0 && !loading && entities !== null && <div>No records data</div>}
    </div>
  );
}

export function PleaseWaitMessage({ entities, isLoading }) {
  return <div>{isLoading && <div className='loading table-loading'>Please wait...</div>}</div>;
}
