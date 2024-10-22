import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import i18n from "discourse-common/helpers/i18n";
import ComboBox from "select-kit/components/combo-box";
import { SETTING_NAME } from "../lib/constants";

export default class UnitConverterPreference extends Component {
  @tracked unitConverterPreference = localStorage.getItem(SETTING_NAME);

  @action
  onChangeUnitConverterPreference(newPreference) {
    this.unitConverterPreference = newPreference;
    localStorage.setItem(SETTING_NAME, newPreference);
  }

  get dropdownOptions() {
    return [
      { value: "all", label: i18n("unit_converter.preference_all") },
      { value: "none", label: i18n("unit_converter.preference_none") },
      { value: "metric", label: i18n("unit_converter.preference_metric") },
      { value: "imperial", label: i18n("unit_converter.preference_imperial") },
    ];
  }

  <template>
    <div class="control-group disable-jump">
      <label class="control-label">
        {{i18n "unit_converter.preference_heading"}}
      </label>

      <div class="controls">
        <label for="unit-converter-preference">
          {{i18n "unit_converter.preference_label"}}
        </label>
		<ComboBox
              @id="unit-converter-preference"
              @content={{this.dropdownOptions}}
              @onChange={{this.onChangeUnitConverterPreference}}
              @value={{this.unitConverterPreference}}
              @valueProperty="value"
            />
      </div>
    </div>
  </template>
}