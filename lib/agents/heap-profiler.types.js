'use strict';
// This file is auto-generated using scripts/doc-sync.js

/**
 * Profile header.
 * 
 * @param {string} title Profile title.
 * @param {integer} uid Unique identifier of the profile.
 * @param {integer=} maxJSObjectId Last seen JS object Id.
 */
exports.ProfileHeader =
function ProfileHeader(props) {
  this.title = props.title;
  this.uid = props.uid;
  this.maxJSObjectId = props.maxJSObjectId;
};

/**
 * Heap snashot object id.
 */
exports.HeapSnapshotObjectId = String;
