declare module '@inquirer/input' {
  type InputProps = {
    message: string;
    default?: string;
    transformer?: (input: string, { isFinal }: { isFinal: boolean }) => string;
    validate?: (input: string) => boolean | string | Promise<string | boolean>;
  };
  export default function (args: InputProps): Promise<string>;
}
