import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  inheritAttrs: false,
  components: {}
})
export default class projectMixin extends Vue {
  get orgId(): string {
    return <any>this.$route.query.orgId;
  }
}
