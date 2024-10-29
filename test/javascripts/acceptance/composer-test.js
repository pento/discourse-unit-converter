import { click, fillIn, visit } from "@ember/test-helpers";
import { test } from "qunit";
import { toggleCheckDraftPopup } from "discourse/services/composer";
import TopicFixtures from "discourse/tests/fixtures/topic";
import {
  acceptance,
  exists,
  query,
} from "discourse/tests/helpers/qunit-helpers";
import { cloneJSON } from "discourse-common/lib/object";

acceptance("Composer", function (needs) {
  needs.user({
    id: 5,
    username: "pento",
    whisperer: true,
  });
  needs.settings({
    general_category_id: 1,
    default_composer_category: 1,
  });
  needs.site({
    can_tag_topics: true,
    categories: [
      {
        id: 1,
        name: "General",
        slug: "general",
        permission: 1,
        topic_template: null,
      },
      {
        id: 2,
        name: "test too",
        slug: "test-too",
        permission: 1,
        topic_template: "",
      },
    ],
  });
  needs.pretender((server, helper) => {
    server.put("/u/pentos.json", () => helper.response({ user: {} }));
    server.post("/uploads/lookup-urls", () => {
      return helper.response([]);
    });
    server.get("/posts/419", () => {
      return helper.response({ id: 419 });
    });
    server.get("/composer/mentions", () => {
      return helper.response({
        users: [],
        user_reasons: {},
        groups: { staff: { user_count: 30 } },
        group_reasons: {},
        max_users_notified_per_group_mention: 100,
      });
    });
    server.get("/t/960.json", () => {
      const topicList = cloneJSON(TopicFixtures["/t/9/1.json"]);
      topicList.post_stream.posts[2].post_type = 4;
      return helper.response(topicList);
    });
  });

  needs.hooks.afterEach(() => toggleCheckDraftPopup(false));

  test("composer integration", async function (assert) {
    await visit("/");
    assert.ok(exists("#create-topic"), "the create button is visible");

    await click("#create-topic");
    assert.ok(exists(".d-editor-input"), "the composer input is visible");

    await fillIn(".d-editor-input", "300ml of water");
    assert.strictEqual(
      query(".d-editor-preview").innerHTML.trim(),
      '<p><span class="unit-converter" title="10.1 fl oz">300ml</span> of water</p>',
      "it converts units in the preview"
    );

    await fillIn(".d-editor-input", "300ml of water\n\n300ml of juice");
    assert.strictEqual(
      query(".d-editor-preview").innerHTML.trim(),
      '<p><span class="unit-converter" title="10.1 fl oz">300ml</span> of water</p>\n<p><span class="unit-converter" title="10.1 fl oz">300ml</span> of juice</p>',
      "it converts two of the same units in the preview"
    );
  });
});
