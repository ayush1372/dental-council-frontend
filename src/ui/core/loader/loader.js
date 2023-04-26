import styles from './loader.module.scss';

export const Loader = (props) => (
  <section className={`center-align ${styles.loader}`}>
    {props.text ? (
      <h3 className="grey-header">{props.text || ''}</h3>
    ) : (
      <svg
        version="1.1"
        id="L6"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 100 100"
        xmlSpace="preserve"
      >
        <rect
          style={{ fill: 'none' }}
          stroke="#fff"
          strokeWidth="4"
          x="25"
          y="25"
          width="50"
          height="50"
        >
          <animateTransform
            attributeName="transform"
            dur="0.5s"
            from="0 50 50"
            to="180 50 50"
            type="rotate"
            id="strokeBox"
            attributeType="XML"
            begin="rectBox.end"
          />
        </rect>
        <rect x="27" y="27" width="46" height="50" style={{ fill: '#fff' }}>
          <animate
            attributeName="height"
            dur="1.3s"
            attributeType="XML"
            from="50"
            to="0"
            id="rectBox"
            style={{ fill: 'freeze' }}
            begin="0s;strokeBox.end"
          />
        </rect>
      </svg>
    )}
  </section>
);