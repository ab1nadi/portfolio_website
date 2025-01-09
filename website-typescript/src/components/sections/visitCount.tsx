import { gql, useQuery, useMutation } from '@apollo/client';

const GET_VISIT_COUNT = gql`
  query Query {
    visitCount {
      count
    }
  }
`;

const UPDATE_VISIT_COUNT = gql`
  mutation Mutation($data: VisitCountInput!) {
    updateVisitCount(data: $data) {
      count
    }
  }
`;

export default function VisitCount() {
  const { loading, error, data } = useQuery(GET_VISIT_COUNT);
  const [updateVisitCount] = useMutation(UPDATE_VISIT_COUNT);

  if (loading || error) {
    return <></>;
  }

  const currentCount = data.visitCount.count;

  // Update the visit count after fetching it

  if(!noCount())
  updateVisitCount({
    variables: {
      data: {
        count: currentCount + 1, // Increment the count
      },
    },
  }).catch((err) => {
    console.error("Error updating visit count:", err);
  });

  return (
    <div className="flex gap-2 ml-6">
      <div>Visits:</div>
      <div>{currentCount}</div>
    </div>
  );
}


// check if the user doesn't want the page
// to count them as a visit.
function noCount()
{
    const queryString = window.location.search;

    // Parse the query string
    const urlParams = new URLSearchParams(queryString);

    // Access specific query parameters
    const noCount = urlParams.get('noCount'); 

    if(noCount)
        return true;
    else
        return false;
}