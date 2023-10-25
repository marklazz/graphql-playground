import React from 'react';
import Link from '../../Link';
import gql from 'graphql-tag';
import '../style.css';
import { Mutation } from 'react-apollo';
import Button from '../../Button';

const STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
    starrable {
    id
    viewerHasStarred
    }
  }
}
`;

const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
  }) => (
  <div>
    <div className="RepositoryItem-title">
      <h2>
        <Link href={url}>
          {name}
        </Link>
      </h2>
      <div className="RepositoryItem-title-action">
    {!viewerHasStarred ? (
      <Mutation mutation={STAR_REPOSITORY} variables={{ id }}>
      {(addStar, { data, loading, error }) => (
        <Button className={'RepositoryItem-title-action'} onClick={addStar} >
        {stargazers.totalCount} Star
        </Button>
      )}
      </Mutation>
    ) : (
      <span>TODO: Implement Remove Star</span>
    )}
{/* Here comes your updateSubscription mutation */}
      </div>
    </div>
    <div className="RepositoryItem-description">
    <div
    className="RepositoryItem-description-info"
    dangerouslySetInnerHTML={{ __html: descriptionHTML }}
    />
    <div className="RepositoryItem-description-details">
    <div>
    {primaryLanguage && (
      <span>Language: {primaryLanguage.name}</span>
    )}
    </div>
    <div>
    {owner && (
      <span>
      Owner: <a href={owner.url}>{owner.login}</a>
      </span>
    )}
    </div>
    </div>
    </div>
    </div>
);
export default RepositoryItem;
