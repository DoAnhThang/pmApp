/* eslint-disable array-callback-return */
import React from "react";
import { Tag } from "antd";

function TagDisplay({ tags, maxTags }) {
  const renderTags = () => {
    if (tags.length <= maxTags) {
      return tags.map((tag, index) => {
        return (
          <Tag key={index}>
            {tag.name || tag.tech_stack_id.name}
            {tag.exp ? ` (${tag.exp}y)` : ""}
          </Tag>
        );
      });
    } else {
      const visibleTags = tags.slice(0, maxTags);
      const remainingTagsCount = tags.length - maxTags;
      return (
        <>
          {visibleTags.map((tag, index) => {
            return (
              <Tag key={index}>
                {tag.name || tag.tech_stack_id.name}
                {tag.exp ? ` (${tag.exp}y)` : ""}
              </Tag>
            );
          })}
          <Tag>{`+ ${remainingTagsCount} ...`}</Tag>
        </>
      );
    }
  };

  return <div>{renderTags()}</div>;
}

export default TagDisplay;
