# frozen_string_literal: true

# name: discourse-unit-converter
# about: Automatically convert units of measurement in posts.
# meta_topic_id: TODO
# version: 0.0.1
# authors: Gary Pendergast (pento)
# url: https://github.com/pento/discourse-unit-converter
# required_version: 2.7.0

enabled_site_setting :unit_converter_enabled

register_asset "stylesheets/unit-converter.scss"
